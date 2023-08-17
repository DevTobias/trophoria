import { Service } from '@freshgum/typedi';

import { AuthService } from '$application/use_cases/auth/_auth.service';
import { UserService } from '$application/use_cases/user/_user.service';
import { UserDatabaseService } from '$application/use_cases/user/user.database.service';
import { PasswordHash } from '$application/utils/password.utils';
import { AuthToken, generateTokenPair } from '$application/utils/token.utils';
import { User } from '$database';
import { SignUpInterface } from '$domain/auth.interface';
import { Environment } from '$infrastructure/config';
import { ENVIRONMENT } from '$infrastructure/webserver';
import { HTTP, httpException } from '$infrastructure/webserver/types';

@Service([UserDatabaseService, ENVIRONMENT])
export class AuthDatabaseService implements AuthService {
  constructor(
    private userService: UserService,
    private env: Environment
  ) {}

  signUp = async (payload: SignUpInterface) => {
    const password = await PasswordHash.hash(payload.password);
    return this.userService.create({ ...payload, password });
  };

  signIn = async ({ id, tokens }: User, refresh?: string) => {
    const { accessToken, refreshId, refreshToken } = await generateTokenPair(id);

    // Parse the refresh token cookie header
    const existingRefreshId = refresh ? (AuthToken.decode(refresh)?.jti as string) : null;

    // If the token already exists in the array, it means that the sign in protocol
    // got called while already signed in. In this case, just remove revoke the
    // old refresh token because a new one got created.
    let filteredTokens = tokens.remove(existingRefreshId);

    // If a refresh token exists / was provided in the sign in process, check for the
    // token in the database. If the token was not found in the database, which means
    // the token got invalidated but still provided by the client, revoke all tokens
    // of the user because a token reuse was detected.
    if (existingRefreshId && tokens.length > 0) {
      await this.userService.findByToken(refreshId).catch(() => (filteredTokens = []));
    }

    // If the user has more than 5 active sessions, also revoke all tokens because there
    // may be some issues or just to many devices.
    if (filteredTokens.length > 5) filteredTokens = [];

    // Add the generated token to the token list. If a token reuse was detected, invalidate
    // all currently active tokens. If the provided refresh token was already persisted,
    // remove it from the list (invalidate it, because a new one got created).
    await this.userService.persistTokens(id, [...filteredTokens, refreshId]);

    // If nothing went wrong, the tokens can get returned
    return { accessToken, refreshToken };
  };

  getAuthenticatedUser = async (identifier: string, password: string) => {
    const user = await this.userService
      .findByEmailOrUsername(identifier)
      .catch(() => httpException('invalid credentials', HTTP.UNAUTHORIZED));

    if (!(await PasswordHash.compare(password, user.password))) {
      httpException('invalid credentials', HTTP.UNAUTHORIZED);
    }

    return user;
  };

  verifyRefreshToken = async (refreshToken: string) => {
    // Try to decode the token in order to get the token id to look
    // for in the database. If this failed, a wrong token was provided.
    const decoded = AuthToken.decode(refreshToken);
    if (!decoded) return httpException('invalid refresh token', HTTP.FORBIDDEN);

    const foundUser = await this.userService.findByToken(decoded.jti as string).catch(() => null);

    // The provided refresh token was not found in database. At this point,
    // the token was a valid jwt token, so it must got used after invalidation, in other
    // words, a token reuse was detected. All tokens of the hacked user should get
    // invalidated by now.
    if (!foundUser) {
      const reusePayload = (await AuthToken.verify(refreshToken, this.env.JWT_REFRESH_PUBLIC_KEY)).payload as {
        id: string;
      };
      await this.userService.persistTokens(reusePayload.id, []);
      return httpException('invalid refresh token', HTTP.FORBIDDEN);
    }

    try {
      AuthToken.verify(refreshToken, this.env.JWT_REFRESH_PUBLIC_KEY);
    } catch (_) {
      // If the token was found in database and was a valid jwt token, it means
      // that the token expired. In this case remove the token from database.
      return httpException('invalid refresh token', HTTP.FORBIDDEN);
    } finally {
      // At this point everything was ok. No reuse was detected and the token was
      // valid and not expired. Return the user object to create a new token pair.
      // eslint-disable-next-line no-unsafe-finally
      return this.userService.persistTokens(foundUser.id, foundUser.tokens.remove(decoded.jti as string));
    }
  };

  refreshToken = async ({ id, tokens }: User) => {
    const { accessToken, refreshId, refreshToken } = await generateTokenPair(id);
    this.userService.persistTokens(id, [...tokens, refreshId]);
    return { refreshToken, accessToken, reuseDetected: false };
  };

  signOut = async (id: string) => {
    await this.userService.persistTokens(id, []);
    return { message: 'successfully signed out', statusCode: HTTP.OK };
  };
}
