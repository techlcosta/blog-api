import { createPostController } from '@/controllers/posts/createPost.controller'
import { getPostController } from '@/controllers/posts/getPost.controller'
import { getPostsController } from '@/controllers/posts/getPosts.controller'
import { getPublicPostController } from '@/controllers/posts/getPublicPost.controller'
import { getPublicPostsController } from '@/controllers/posts/getPublicPosts.controller'
import { authenticationMiddleware } from '@/middleware/authentication.middleware'
import { upload } from '@/middleware/uploadImage.middleware'
import express from 'express'

export const postRoutes = express.Router()

postRoutes.get('/public', getPublicPostsController)
postRoutes.get('/public/article', getPublicPostController)

postRoutes.get('/', authenticationMiddleware, getPostsController)
postRoutes.get('/article', authenticationMiddleware, getPostController)
postRoutes.post('/create', authenticationMiddleware, upload.single('file'), createPostController)
