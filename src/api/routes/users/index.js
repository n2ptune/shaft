import { Router } from 'express'
import {
  findAllUserByPageController,
  findUserByIDController
} from './find-user'

const router = Router()

router.get('/', findAllUserByPageController)
router.get('/:id', findUserByIDController)

export default router
