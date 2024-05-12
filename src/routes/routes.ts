import { Router } from 'express'
import { postRoutes } from './posts.routes'
import { userRoutes } from './user.routes'

export const router = Router()

router.use('/user', userRoutes)
router.use('/post', postRoutes)
