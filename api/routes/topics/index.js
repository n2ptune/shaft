import { Router } from 'express'
import authMiddleware from '../../middleware/auth'
import newTopics from './new'
import getCategories from './category'
import { topicByID, allTopics } from './read'

const router = Router()

router.post('/new', authMiddleware, newTopics)
router.get('/category', getCategories)
router.get('/:id', topicByID)
router.get('/', allTopics)

export default router
