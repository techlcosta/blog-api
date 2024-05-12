import { env } from '@/env'
import { ErrorHandler } from '@/errors/errorHandler'
import { IUserRepository, RoleType } from '@/repositories/users/user.interfaces'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface ISignInUseCaseRequest {
  email: string
  password: string
}

interface ISignInUseCaseResponse {
  email: string
  firstName: string
  lastName: string
  role: RoleType
  refresh_token: string
  access_token: string
}

export class SignInUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email, password }: ISignInUseCaseRequest): Promise<ISignInUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user)
      throw new ErrorHandler('Sign in failed. Check your email and password.', 401, 'unauthorized')

    const passwordMach = await compare(password, user.password)

    if (!passwordMach)
      throw new ErrorHandler('Sign in failed. Check your email and password.', 401, 'unauthorized')

    const access_token = sign({ role: user.role }, env.JWT_SECRET, {
      subject: user._id.toString(),
      expiresIn: '4h'
    })
    const refresh_token = sign({ role: user.role }, env.JWT_SECRET, {
      subject: user._id.toString(),
      expiresIn: '5d'
    })
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      access_token,
      refresh_token
    }
  }
}
