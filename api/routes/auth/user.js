import {
  verifyToken,
  decodeToken,
  signAccessTokenWithRT
} from '../../models/user/token'
import { findByEmail } from '../../models/user/find'

export default async function(req, res) {
  try {
    if (!req.headers.authorization) throw new Error('Not Found AccessToken')

    const token = req.headers.authorization.replace('Bearer ', '')
    const decoded = verifyToken(token)

    if (!decoded) throw new Error('Something Wrong')

    return res.status(200).send(decoded)
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = decodeToken(token)

        if (!decoded) {
          throw new Error('Invalid Token')
        }

        const user = await findByEmail(decoded.email)
        const acct = signAccessTokenWithRT(user.token)

        if (acct) {
          return res
            .set('x-www-access-token', acct)
            .status(201)
            .end()
        }
      } catch (innerError) {
        return res.status(500).end()
      }
    }
    return res.status(400).send({ message: error.message })
  }
}
