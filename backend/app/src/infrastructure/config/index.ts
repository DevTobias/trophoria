import { z } from 'zod';

export const environmentSchema = z.object({
  // General environments
  NODE_ENV: z.enum(['development', 'test', 'production']),

  // Server config
  HOST: z.string().min(1),
  PORT: z.string().transform((val) => parseInt(val, 10)),

  // Database configuration
  DATABASE_URL: z.string().min(1),

  // Authentication token config
  JWT_ISSUER: z.string().min(1),
  JWT_AUDIENCE: z.string().min(1),
  JWT_PRIVATE_KEY: z.string().min(1),
  JWT_PUBLIC_KEY: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1),
  JWT_REFRESH_PRIVATE_KEY: z.string().min(1),
  JWT_REFRESH_PUBLIC_KEY: z.string().min(1),
  JWT_REFRESH_EXPIRES_IN: z.string().min(1),
});

export interface Environment extends z.infer<typeof environmentSchema> {
  IS_DEV: boolean;
}

export const loadEnvironment = (): Environment => {
  const env = environmentSchema.parse(process.env);

  const helper = {
    IS_DEV: env.NODE_ENV === 'development',
  };

  return { ...env, ...helper };
};
