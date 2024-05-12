import { IPost } from '@/repositories/posts/post.interface'
import { Schema, Types, model } from 'mongoose'

const categories = ['forex', 'stocks', 'cryptocurrency']

const permissions = ['public', 'subscriber']

export type createdByType = Types.ObjectId

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      minlength: [6, 'Title must have at least 6 characters.'],
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      required: true,
      index: true,
      enum: categories
    },
    permission: {
      type: String,
      required: true,
      index: true,
      enum: permissions
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      index: true
    },
    content: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    imageName: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const Post = model('post', postSchema)
