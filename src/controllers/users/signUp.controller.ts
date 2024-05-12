import { UserRepository } from '@/repositories/users/user.repository'
import { SignUpUseCase } from '@/use-cases/users/signUp.useCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const signUpScheme = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
})

export async function signUpController(
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | undefined> {
  try {
    const { firstName, lastName, email, password } = signUpScheme.parse(req.body)

    const userRepository = new UserRepository()

    const signUpUseCase = new SignUpUseCase(userRepository)

    await signUpUseCase.execute({ firstName, lastName, email, password })

    return resp.status(201).send({ message: 'Sign Up successfully!' })
  } catch (error) {
    next(error)
  }
}
