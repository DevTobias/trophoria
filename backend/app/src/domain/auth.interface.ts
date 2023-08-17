import { t } from 'elysia';

export const signUpSchema = t.Object({ email: t.String(), username: t.String(), password: t.String() });
export type SignUpInterface = typeof signUpSchema.static;
