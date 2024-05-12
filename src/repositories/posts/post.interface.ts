import { createdByType } from '@/models/post/post.model'
import { z } from 'zod'

export const PermissionSchema = z.enum(['public', 'subscriber'])

export type PermissionType = z.infer<typeof PermissionSchema>

export interface IPost {
  _id: string
  title: string
  slug: string
  category: string
  content: string
  imageUrl: string
  imageName: string
  permission: PermissionType
  createdBy: createdByType
  createdAt: Date
  updatedAt: Date
}

export interface IPostCreate {
  title: string
  slug: string
  category: string
  content: string
  imageUrl: string
  imageName: string
  permission: PermissionType
  createdBy: string
}

export interface IPostUpdate {
  _id: string
  title?: string
  slug?: string
  category?: string
  content?: string
  imageUrl?: string
  imageName?: string
  permission?: PermissionType
}

export interface IFindByPermission {
  page: number
  limit: number
  category?: string
  permission?: PermissionType
}

export interface IFindByPermissionResponse {
  posts: IPost[]
  total: number
}

export interface IPostRespository {
  create: (data: IPostCreate) => Promise<IPost>
  update: (data: IPostUpdate) => Promise<IPost>
  findById: (id: string) => Promise<IPost | null>
  findByPermission: (data: IFindByPermission) => Promise<IFindByPermissionResponse>
}
