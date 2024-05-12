import { PostRepository } from '@/repositories/posts/post.repository'
import { GetPostUseCase } from '@/use-cases/posts/getPost.useCase'

import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const getPostSchema = z.object({
  postId: z.string()
})

export async function getPublicPostController(
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | undefined> {
  try {
    const { postId } = getPostSchema.parse(req.query)

    const postRepository = new PostRepository()
    const getPostUseCase = new GetPostUseCase(postRepository)

    const post = await getPostUseCase.execute({ role: 'public', id: postId })

    return resp.json(post)
  } catch (error) {
    next(error)
  }
}
