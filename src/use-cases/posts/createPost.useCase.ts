import { ErrorHandler } from '@/errors/errorHandler'
import { IPost, IPostRespository, PermissionType } from '@/repositories/posts/post.interface'
import { RoleType } from '@/repositories/users/user.interfaces'

interface ICreatePostUseCaseRquest {
  title: string
  category: string
  content: string
  imageUrl: string
  imageName: string
  permission: PermissionType
  role: RoleType
  userId: string
}

export class CreatePostUseCase {
  constructor(private readonly postRepository: IPostRespository) {}

  async execute(data: ICreatePostUseCaseRquest): Promise<IPost> {
    if (data.role !== 'admin') throw new ErrorHandler('Unauthorized', 401, 'unauthorized')

    const post = await this.postRepository.create({
      title: data.title,
      slug: data.title.split(' ').join('-'),
      category: data.category,
      content: data.content,
      imageUrl: data.imageUrl,
      imageName: data.imageName,
      permission: data.permission,
      createdBy: data.userId
    })

    return post
  }
}
