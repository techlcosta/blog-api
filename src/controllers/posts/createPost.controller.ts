import { env } from '@/env'
import { s3Client } from '@/libs/awsS3Client'
import { PermissionSchema } from '@/repositories/posts/post.interface'
import { PostRepository } from '@/repositories/posts/post.repository'
import { CreatePostUseCase } from '@/use-cases/posts/createPost.useCase'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const postSchema = z.object({
  title: z.string(),
  category: z.string(),
  permission: PermissionSchema,
  content: z.string()
})

const userSchema = z.object({
  id: z.string(),
  role: z.enum(['admin'])
})

const fileSchema = z.object({
  path: z.string(),
  filename: z.string()
})

export async function createPostController(
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<Response | undefined> {
  try {
    const { path, filename } = fileSchema.parse(req.file)
    const { id: userId, role } = userSchema.parse(req.user)
    const { title, category, permission, content } = postSchema.parse(req.body)

    const postRepository = new PostRepository()
    const createPostUseCase = new CreatePostUseCase(postRepository)

    await createPostUseCase.execute({
      title,
      category,
      permission,
      content,
      userId,
      role,
      imageUrl: path,
      imageName: filename
    })

    return resp.status(201).send()
  } catch (error) {
    const deleteParams = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: req.file?.filename
    }
    console.log('1')

    await s3Client.send(new DeleteObjectCommand(deleteParams)).catch(() => {
      console.log('2')
    })

    next(error)
  }
}
