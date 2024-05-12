import { UserRepository } from '@/repositories/users/user.repository'
import { SignInUseCase } from '@/use-cases/users/signIn.useCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const signInScheme = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export async function signInController(
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | undefined> {
  try {
    const { email, password } = signInScheme.parse(req.body)

    const userRepository = new UserRepository()

    const signInUseCase = new SignInUseCase(userRepository)

    const { firstName, lastName, role, access_token, refresh_token } = await signInUseCase.execute({
      email,
      password
    })

    resp.cookie('dx_access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 5 * 60 * 60 * 1000
    })
    resp.cookie('dx_refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return resp.json({ email, firstName, lastName, role })
  } catch (error) {
    next(error)
  }
}
