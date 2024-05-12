import { ErrorHandler } from '@/errors/errorHandler'
import { IUserRepository } from '@/repositories/users/user.interfaces'
import { hash } from 'bcryptjs'

interface SignupUseCaseRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

export class SignUpUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ firstName, lastName, email, password }: SignupUseCaseRequest): Promise<void> {
    const emailAlredyExists = await this.userRepository.findByEmail(email)
    if (emailAlredyExists)
      throw new ErrorHandler(
        'The email address is already in use. Please use a different email address or recover your account.'
      )

    const passwordHash = await hash(password, 10)

    await this.userRepository.signUp({
      email,
      firstName,
      lastName,
      role: 'public',
      password: passwordHash
    })
  }
}
