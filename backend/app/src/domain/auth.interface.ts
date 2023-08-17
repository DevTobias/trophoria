import { t } from 'elysia';

export const signUpSchema = t.Object({ email: t.String(), username: t.String(), password: t.String() });
export type SignUpInterface = typeof signUpSchema.static;

export const signInSchema = t.Object({ identifier: t.String(), password: t.String() });
export type SignInInterface = typeof signInSchema.static;

export interface TokenInterface {
  accessToken: string;
  refreshToken: string;
}
