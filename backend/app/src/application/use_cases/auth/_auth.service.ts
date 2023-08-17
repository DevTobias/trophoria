import { User } from '$database';
import { SignUpInterface, TokenInterface } from '$domain/auth.interface';
import { GenericInterface } from '$domain/generic.interface';

export interface AuthService {
  /**
   * Registers a new {@link User} in the system. If the email or
   * username already exists, a {@link HttpException} gets thrown.
   *
   * @param user  The user dto which should get persisted
   * @throws      {@link HttpException} if username or email already exists
   * @returns     The freshly created user
   */
  signUp: (payload: SignUpInterface) => Promise<User>;

  /**
   * Signs in the provided user. This means generating a new
   * access and refresh token. The id of the refresh token gets
   * saved to database, to be able to detect token reuse in the future.
   *
   * @param user            The user object to authenticate
   * @param refreshCookie   The refresh token originally persisted in cookies
   * @returns               The generated token pair and a reuse detection flag
   */
  signIn: (user: User, refresh?: string) => Promise<TokenInterface>;

  /**
   * Returns the user in database with the provided email if the plain password
   * matches the persisted password hash. If the credentials do not match,
   * a {@link HttpException} gets thrown.
   *
   * @param email     The email of the user account
   * @param password  The password of the user account
   * @throws          {@link HttpException} if password does not match
   * @returns         The found user object if password matches
   */
  getAuthenticatedUser: (identifier: string, password: string) => Promise<User>;

  /**
   * Verifies if the refresh token is valid. If this is the case, the
   * user associated with this token gets returned. If the token is invalid,
   * an {@link HttpException} gets thrown. If a token reuse gets detected,
   * all valid user tokens are getting invalidated, because the token may got
   * hijacked.
   *
   * @param refreshToken  The refresh token to validate
   * @throws              {@link HttpException} if token is invalid
   * @returns             The user associated to the token if valid
   */
  verifyRefreshToken(refreshToken: string): Promise<User>;

  /**
   * Generates a new token pair for the authenticated user and updates the current session
   * token in the database. This method does not validate the refresh token! CAUTION! Make sure
   * you {@link verifyRefreshToken} before calling this.
   *
   * @param user  The user to generate a fresh key pair for
   * @returns     The generated token pair
   */
  refreshToken(user: User): Promise<TokenInterface>;

  /**
   * Signs out the user in all active sessions by invalidating all active
   * refresh tokens.
   *
   * @param id  The id of the user to sign out
   */
  signOut(id: string): Promise<GenericInterface>;
}
