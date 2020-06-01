import parseAuth from '../utils/parse-authorization'
import {
  verifyToken,
  decodeToken,
  signAccessTokenWithRT
} from '../models/user/token'
import { findByEmail } from '../models/user/find'

export default async function(req, res, next) {
  const token = parseAuth(req.headers.authorization)
  // if (!token) {
  //   return res.status(401).send({ message: '인증 필요' })
  // } else if (!verifyToken(token)) {
  //   // 액세스 토큰 만료
  //   res.locals.token = 'test'
  //   console.log('test passed')
  //   next()
  // } else {
  //   next()
  // }

  try {
    if (!token) throw new Error('Not Found Token')

    // 토큰 검증 시도
    // 만료되었다면 catch에 'TokenExpiredError' 라는 이름의 에러 발생
    verifyToken(token)

    next()
  } catch (error) {
    if (error.name === 'Not Found Token') {
      return res.status(401).end()
    } else if (error.name === 'TokenExpiredError') {
      try {
        const decoded = decodeToken(token)
        const user = await findByEmail(decoded.email)
        const accessToken = signAccessTokenWithRT(user.token)

        res.locals.token = accessToken
        next()
      } catch (error) {
        return res.status(500).end()
      }
    }
  }
}
