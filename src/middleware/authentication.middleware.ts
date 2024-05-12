import { env } from '@/env'
import { ErrorHandler } from '@/errors/errorHandler'
import { RoleType } from '@/repositories/users/user.interfaces'
import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError, JwtPayload, verify } from 'jsonwebtoken'

export interface IPayload extends JwtPayload {
  sub: string
  role: RoleType
}

export function authenticationMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  const { dx_access_token } = request.cookies

  if (!dx_access_token) {
    next(new ErrorHandler('Token missing', 401, 'unauthorized'))
    return
  }

  try {
    const { sub, role } = verify(dx_access_token as string, env.JWT_SECRET) as IPayload

    request.user = {
      id: sub,
      role
    }

    next()
  } catch (error) {
    if (error instanceof JsonWebTokenError && error.message === 'jwt expired')
      next(new ErrorHandler(error.message, 401, 'expired'))
    else next(new ErrorHandler('Token is missing or invalid', 401, 'unauthorized'))
  }
}
