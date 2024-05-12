import { refreshTokenController } from '@/controllers/users/refreshToken.controller'
import { signInController } from '@/controllers/users/signIn.controller'
import { signUpController } from '@/controllers/users/signUp.controller'
import { authenticationMiddleware } from '@/middleware/authentication.middleware'
import express, { Request, Response } from 'express'

export const userRoutes = express.Router()

userRoutes.post('/sign-up', signUpController)

userRoutes.post('/sign-in', signInController)

userRoutes.get('/refresh-token', refreshTokenController)

userRoutes.get('/test', authenticationMiddleware, (req: Request, res: Response) => {
  console.log(req.user.id, req.user.role)
  res.send('hello')
})
