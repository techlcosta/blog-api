import { env } from '@/env'
import { ErrorHandler } from '@/errors/errorHandler'
import { IPayload } from '@/middleware/authentication.middleware'
import { IUserRepository } from '@/repositories/users/user.interfaces'
import { sign, verify } from 'jsonwebtoken'

interface IRefreshTokenUseCaseRequest {
  refresh_token: string
}

interface IRefreshTokenUseCaseResponse {
  email: string
  firstName: string
  role: string
  access_token: string
}

export class RefreshTokenUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({
    refresh_token
  }: IRefreshTokenUseCaseRequest): Promise<IRefreshTokenUseCaseResponse> {
    const { sub } = verify(refresh_token, env.JWT_SECRET) as IPayload

    const user = await this.userRepository.findById(sub)

    if (!user) throw new ErrorHandler('Refresh token failed. ', 401, 'unauthorized')

    const access_token = sign({ role: user.role }, env.JWT_SECRET, {
      subject: user._id.toString(),
      expiresIn: '1h'
    })

    return {
      email: user.email,
      access_token,
      firstName: user.firstName,
      role: user.role
    }
  }
}
