import { PostRepository } from '@/repositories/posts/post.repository'
import { GetPostsUseCase } from '@/use-cases/posts/getPosts.useCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const getPostSchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  category: z.string().optional()
})

export async function getPublicPostsController(
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | undefined> {
  try {
    const { limit, page, category } = getPostSchema.parse(req.query)

    const postRepository = new PostRepository()
    const getPostsUseCase = new GetPostsUseCase(postRepository)

    const posts = await getPostsUseCase.execute({ role: 'public', limit, page, category })

    return resp.json(posts)
  } catch (error) {
    next(error)
  }
}
