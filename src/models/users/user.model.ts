import { IUser } from '@/repositories/users/user.interfaces'
import { Schema, model } from 'mongoose'

const schema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      default: " "
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      enum: ['public', 'subscriber', 'admin'],
      default: 'public'
    }
  },
  { timestamps: true }
)

export const User = model<IUser>('users', schema)
