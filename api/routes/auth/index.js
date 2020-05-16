import { Router } from 'express'
import signUp from './sign-up'
import signIn from './sign-in'
import user from './user'

const router = Router()

router.post('/login', signIn)
router.post('/logout', (req, res, next) => {})
router.post('/sign-up', signUp)
router.post('/user', user)

export default router
