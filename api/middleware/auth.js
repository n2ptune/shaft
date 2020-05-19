import parseAuth from '../utils/parse-authorization'
import { verifyToken } from '../models/user/token'

export default function(req, res, next) {
  const token = parseAuth(req.headers.authorization)
  if (!token || !verifyToken(token)) {
    return res.status(401).send({ message: '인증 필요' })
  } else {
    next()
  }
}
