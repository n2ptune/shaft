import { Router } from 'express'
import signUp from './sign-up'
import signIn from './sign-in'

const router = Router()

router.post('/login', signIn)
router.post('/logout', (req, res, next) => {})
router.post('/sign-up', signUp)

export default router
