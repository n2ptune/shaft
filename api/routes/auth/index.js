import { Router } from 'express'
import signUp from './sign-up'

const router = Router()

router.post('/login', (req, res, next) => {})
router.post('/logout', (req, res, next) => {})
router.post('/sign-up', signUp)

export default router
