import { env } from '@/env'
import mongoose, { Error } from 'mongoose'

export function mongoConnection(): void {
  mongoose
    .connect(env.DATABASE_URL, {dbName: "blog"})
    .then(() => {
      console.log('✅ MongoDB connected.')
    })
    .catch((error: unknown) => {
      if (error instanceof Error) console.error('❌ MongoDB connection error:', error.message)
      else console.error('❌ MongoDB connection error:', error)
      process.exit(1)
    })
}
