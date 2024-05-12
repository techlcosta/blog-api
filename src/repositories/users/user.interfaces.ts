import { z } from 'zod'

export const RoleSchema = z.enum(['public', 'subscriber', 'admin'])

export type RoleType = z.infer<typeof RoleSchema>

export interface IUser {
  _id: string
  firstName: string
  lastName: string
  image?: string
  email: string
  role: RoleType
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface IUserSignUp {
  firstName: string
  lastName: string
  image?: string
  email: string
  role: RoleType
  password: string
}

export interface IUserUpdate {
  _id: string
  firstName?: string
  lastName?: string
  image?: string
  email?: string
  password?: string
}

export interface IUserRepository {
  update: (data: IUserUpdate) => Promise<IUser>
  findById: (id: string) => Promise<IUser | null>
  findByEmail: (email: string) => Promise<IUser | null>
  signUp: (data: IUserSignUp) => Promise<IUser>
}
