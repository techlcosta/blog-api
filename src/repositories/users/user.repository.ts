import { ErrorHandler } from '@/errors/errorHandler'
import { User } from '@/models/users/user.model'
import { IUser, IUserRepository, IUserSignUp, IUserUpdate } from './user.interfaces'

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<IUser | null> {
    const user = await User.findById(id)

    return user
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email })

    return user
  }

  async signUp(data: IUserSignUp): Promise<IUser> {
    const user = await User.create({
      email: data.email,
      password: data.password,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image
    })

    return user
  }

  async update(data: IUserUpdate): Promise<IUser> {
    const user = await User.findByIdAndUpdate(
      data._id,
      {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
      },
      { new: true }
    )

    if (!user) {
      throw new ErrorHandler('No user found with the given ID')
    }

    return user
  }
}
