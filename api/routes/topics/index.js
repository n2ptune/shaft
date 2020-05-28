import { Router } from 'express'
import authMiddleware from '../../middleware/auth'
import newTopics from './new'
import getCategories from './category'

const router = Router()

router.post('/new', authMiddleware, newTopics)
router.get('/category', getCategories)

export default router
