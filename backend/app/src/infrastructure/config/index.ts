import { z } from 'zod';

export const environmentSchema = z.object({
  // General environments
  NODE_ENV: z.enum(['development', 'test', 'production']),

  // Server config
  HOST: z.string().min(1),
  PORT: z.string().transform((val) => parseInt(val, 10)),
});

export type Environment = z.infer<typeof environmentSchema>;

export const loadEnvironment = (): Environment => {
  return environmentSchema.parse(process.env);
};
