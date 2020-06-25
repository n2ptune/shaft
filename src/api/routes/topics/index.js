import { Router } from 'express'
import authMiddleware from '../../middleware/auth'
import newTopics from './new'
import getCategories from './category'
import { topicByID, allTopics } from './read'
import like from './like'
import deleteTopic from './delete'

const router = Router()

router.post('/new', authMiddleware, newTopics)
router.get('/category', getCategories)
router.get('/:id', topicByID)
router.get('/', allTopics)
router.put('/like', authMiddleware, like)
router.delete('/:id', authMiddleware, deleteTopic)

export default router
