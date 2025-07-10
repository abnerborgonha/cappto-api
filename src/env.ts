import { z } from 'zod/v4';

const envSchema = z.object({
  PORT: z.coerce.number().default(3030),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  DATABASE_URL: z.string().startsWith('postgresql://'),
  SUPABASE_URL: z.string().includes('supabase.co'),
  SUPABSE_KEY: z.string()
});

export const env = envSchema.parse(process.env);