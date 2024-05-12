import { IPost, IPostRespository } from '@/repositories/posts/post.interface'
import { RoleType } from '@/repositories/users/user.interfaces'

interface IGetPostsUseCaseRequest {
  role: RoleType
  page: number
  limit?: number
  category?: string
}

interface IGetPostsUseCaseResponse {
  posts: IPost[]
  total: number
}

export class GetPostsUseCase {
  constructor(private readonly postRepository: IPostRespository) {}

  async execute({
    role,
    page,
    category,
    limit = 10
  }: IGetPostsUseCaseRequest): Promise<IGetPostsUseCaseResponse> {
    const permission = role === 'public' ? 'public' : undefined

    const { posts, total } = await this.postRepository.findByPermission({ permission, limit, page, category })

    return {
      posts,
      total
    }
  }
}
