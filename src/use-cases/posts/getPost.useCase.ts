import { ErrorHandler } from '@/errors/errorHandler'
import { IPost, IPostRespository } from '@/repositories/posts/post.interface'
import { RoleType } from '@/repositories/users/user.interfaces'

interface IGetPostUseCaseRequest {
  role: RoleType
  id: string
}

export class GetPostUseCase {
  constructor(private readonly postRepository: IPostRespository) {}

  async execute({ role, id }: IGetPostUseCaseRequest): Promise<IPost | null> {
    const post = await this.postRepository.findById(id)

    if (post?.permission !== 'public' && role === 'public')
      throw new ErrorHandler('Unauthorized', 401, 'unauthorized')

    return post
  }
}
