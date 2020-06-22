import { Router } from 'express'
import authMiddleware from '../../middleware/auth'
import { newComment } from './new'
import readCommentByID from './read'
import updateComment from './update'
import deleteComment from './delete'

const router = Router()

router.post('/new', authMiddleware, newComment)
router.get('/get/:id', readCommentByID)
router.put('/update', authMiddleware, updateComment)
router.delete('/delete/:id', authMiddleware, deleteComment)

export default router
