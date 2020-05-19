import { verifyToken } from '../../models/user/token'

export default function(req, res) {
  try {
    if (!req.headers.authorization) throw new Error('Not Found AccessToken')

    const token = req.headers.authorization.replace('Bearer ', '')
    const decoded = verifyToken(token)

    if (!decoded) throw new Error('Something Wrong')

    return res.status(200).send(decoded)
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log('expired!')
      // TODO get refresh token by user id and get access token with refresh token
    }
    return res.status(400).send({ message: error.message })
  }
}
