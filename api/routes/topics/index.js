import { Router } from 'express'
import authMiddleware from '../../middleware/auth'
import newTopics from './new'

const router = Router()

router.post('/new', authMiddleware, newTopics)

export default router
