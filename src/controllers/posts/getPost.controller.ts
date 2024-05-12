import { PostRepository } from '@/repositories/posts/post.repository'
import { RoleSchema } from '@/repositories/users/user.interfaces'
import { GetPostUseCase } from '@/use-cases/posts/getPost.useCase'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const getPostSchema = z.object({
  postId: z.string()
})

const userSchema = z.object({
  id: z.string(),
  role: RoleSchema
})

export async function getPostController(
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | undefined> {
  try {
    const { role } = userSchema.parse(req.user)
    const { postId } = getPostSchema.parse(req.query)

    const postRepository = new PostRepository()
    const getPostUseCase = new GetPostUseCase(postRepository)

    const post = await getPostUseCase.execute({ role, id: postId })

    return resp.json(post)
  } catch (error) {
    next(error)
  }
}
