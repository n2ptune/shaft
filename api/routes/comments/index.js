import { Router } from 'express'
import authMiddleware from '../../middleware/auth'
import { newComment } from './new'
import readCommentByID from './read'

const router = Router()

router.post('/new', authMiddleware, newComment)
router.get('/get/:id', readCommentByID)

export default router
