import parseAuth from '../utils/parse-authorization'
import {
  verifyToken,
  decodeToken,
  signAccessTokenWithRT
} from '../models/user/token'
import { findByEmail } from '../models/user/find'

export default async function(req, res, next) {
  const token = parseAuth(req.headers.authorization)

  try {
    if (!token) throw new Error('Not Found Token')

    // 토큰 검증 시도
    // 만료되었다면 catch에 'TokenExpiredError' 라는 이름의 에러 발생
    const user = verifyToken(token)

    res.locals.user = user

    next()
  } catch (error) {
    if (error.name === 'Not Found Token') {
      return res.status(401).end()
    } else if (error.name === 'TokenExpiredError') {
      try {
        const decoded = decodeToken(token)
        const user = await findByEmail(decoded.email)
        const accessToken = signAccessTokenWithRT(user.token)
        const refreshUser = decodeToken(accessToken)

        res.locals.user = refreshUser

        res.locals.token = accessToken
        res.append('x-www-access-token', accessToken)
        next()
      } catch (error) {
        return res.status(500).end()
      }
    }
  }
}
