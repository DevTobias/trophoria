import { z } from 'zod';

export const environmentSchema = z.object({
  // General environments
  NODE_ENV: z.enum(['development', 'test', 'production']),

  // Server config
  HOST: z.string().min(1),
  PORT: z.string().transform((val) => parseInt(val, 10)),

  // Database configuration
  DATABASE_URL: z.string().min(1),
});

interface Environment extends z.infer<typeof environmentSchema> {
  IS_DEV: boolean;
}

export const loadEnvironment = (): Environment => {
  const env = environmentSchema.parse(process.env);

  const helper = {
    IS_DEV: env.NODE_ENV === 'development',
  };

  return { ...env, ...helper };
};
