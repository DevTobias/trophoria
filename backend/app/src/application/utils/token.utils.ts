import { randomUUID } from 'node:crypto';

import {
  JWTPayload,
  ProtectedHeaderParameters,
  SignJWT,
  decodeProtectedHeader,
  importPKCS8,
  importSPKI,
  jwtVerify,
} from 'jose';

import { ENVIRONMENT, resolve } from '$infrastructure/webserver';

interface Options {
  expiresIn: string | number;
  subject: string;
  jwtid: string;
}

export const AuthToken = {
  sign: async (payload: JWTPayload, secretKey: string, options: Options): Promise<string> => {
    const env = resolve(ENVIRONMENT);
    const privateKey = await importPKCS8(secretKey, 'RS256');
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256', jti: options.jwtid })
      .setIssuer(env.JWT_ISSUER)
      .setAudience(env.JWT_AUDIENCE)
      .setExpirationTime(options.expiresIn)
      .setSubject(options.subject)
      .setJti(options.jwtid)
      .setIssuedAt()
      .sign(privateKey);
  },

  verify: async (token: string, publicKey: string) => {
    const env = resolve(ENVIRONMENT);
    const key = await importSPKI(publicKey, 'RS256');
    return jwtVerify(token, key, {
      issuer: env.JWT_ISSUER,
      audience: env.JWT_AUDIENCE,
    });
  },

  decode: (token: string) => decodeProtectedHeader(token) as ProtectedHeaderParameters,
};

/**
 * Generates a access and refresh token pair containing the provided user id.
 * It also returns a unique and random refresh id. This refresh id is needed to
 * improve security and should get saved in the database instead of the actual tokens.
 *
 * @param id  The users id
 * @returns   The token pair containing, access, refresh token and refresh id
 */
export const generateTokenPair = async (id: string) => {
  const env = resolve(ENVIRONMENT);
  const refreshId = randomUUID();

  const [accessToken, refreshToken] = await Promise.all([
    AuthToken.sign({ id }, env.JWT_PRIVATE_KEY, { subject: id, expiresIn: env.JWT_EXPIRES_IN, jwtid: id }),
    AuthToken.sign({ id }, env.JWT_REFRESH_PRIVATE_KEY, {
      subject: id,
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
      jwtid: refreshId,
    }),
  ]);

  return { accessToken, refreshToken, refreshId };
};
