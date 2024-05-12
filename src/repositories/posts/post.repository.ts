import { ErrorHandler } from '@/errors/errorHandler'
import { Post } from '@/models/post/post.model'
import { Types } from 'mongoose'
import {
  IFindByPermission,
  IFindByPermissionResponse,
  IPost,
  IPostCreate,
  IPostRespository,
  IPostUpdate
} from './post.interface'

export class PostRepository implements IPostRespository {
  async create(data: IPostCreate): Promise<IPost> {
    const post = await Post.create({
      title: data.title,
      slug: data.slug,
      category: data.category,
      permission: data.permission,
      imageUrl: data.imageUrl,
      imageName: data.imageName,
      content: data.content,
      createdBy: new Types.ObjectId(data.createdBy)
    })

    return post
  }

  async update(data: IPostUpdate): Promise<IPost> {
    const post = await Post.findByIdAndUpdate(
      data._id,
      {
        title: data.title,
        slug: data.slug,
        category: data.category,
        permission: data.permission,
        imageUrl: data.imageUrl,
        imageName: data.imageName,
        content: data.content
      },
      { new: true }
    )

    if (!post) {
      throw new ErrorHandler('No post found with the given ID')
    }

    return post
  }

  async findById(id: string): Promise<IPost | null> {
    const post = await Post.findOne({ _id: id })

    return post
  }

  async findByPermission(data: IFindByPermission): Promise<IFindByPermissionResponse> {
    const query: Record<string, string> = {}

    if (data.permission === 'public') query.permission = data.permission
    if (data.category) query.category = data.category

    const posts = await Post.find(query)
      .populate({
        path: 'createdBy',
        select: 'firstName image'
      })
      .limit(data.limit)
      .skip((data.page - 1) * data.limit)
      .sort({ createdAt: -1 })
      .exec()

    const total = await Post.countDocuments(query)

    return {
      posts,
      total
    }
  }
}
