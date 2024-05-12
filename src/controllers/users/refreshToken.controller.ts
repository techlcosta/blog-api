import { UserRepository } from '@/repositories/users/user.repository'
import { RefreshTokenUseCase } from '@/use-cases/users/refreshToken.useCase'
import { NextFunction, Request, Response } from 'express'

export async function refreshTokenController(
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | undefined> {
  try {
    const { dx_refresh_token } = req.cookies

    const userRepository = new UserRepository()

    const refreshTokenUseCase = new RefreshTokenUseCase(userRepository)

    const { firstName, email, role, access_token } = await refreshTokenUseCase.execute({
      refresh_token: dx_refresh_token as string
    })

    resp.cookie('dx_access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 5 * 60 * 60 * 1000
    })

    return resp.json({ email, firstName, role })
  } catch (error) {
    next(error)
  }
}
