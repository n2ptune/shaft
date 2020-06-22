import { Router } from 'express'
import findUser from './find-user'

const router = Router()

router.get('/:id', findUser)

export default router
