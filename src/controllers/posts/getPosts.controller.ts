import { PostRepository } from '@/repositories/posts/post.repository'
import { RoleSchema } from '@/repositories/users/user.interfaces'
import { GetPostsUseCase } from '@/use-cases/posts/getPosts.useCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const getPostSchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number().optional(),
  category: z.string().optional()
})

const userSchema = z.object({
  id: z.string(),
  role: RoleSchema
})

export async function getPostsController(
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | undefined> {
  try {
    const { role } = userSchema.parse(req.user)
    const { limit, page, category } = getPostSchema.parse(req.query)

    const postRepository = new PostRepository()
    const getPostsUseCase = new GetPostsUseCase(postRepository)

    const posts = await getPostsUseCase.execute({ role, limit, page, category })

    return resp.json(posts)
  } catch (error) {
    next(error)
  }
}
