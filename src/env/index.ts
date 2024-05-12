import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  REDIS_HOST: z.string(),
  JWT_SECRET: z.string(),
  CORS_ORIGIN: z.string(),
  DATABASE_URL: z.string(),
  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  PORT: z.coerce.number().default(3330),
  REDIS_PORT: z.coerce.number().default(6973),
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev')
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
