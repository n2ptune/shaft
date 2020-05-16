import { decodeToken } from '../../models/user/token'

export default function(req, res) {
  try {
    if (!req.headers.authorization) throw new Error('Not Found AccessToken')

    const token = req.headers.authorization.replace('Bearer ', '')
    const decoded = decodeToken(token)

    if (!decoded) throw new Error('Invalid Token')

    return res.status(200).send(decoded)
  } catch (error) {
    return res.status(400).send({ message: error.message })
  }
  // if (decoded) {
  //   res.status(200).send(decoded)
  // } else {
  //   res.status(400).send({ message: 'error' })
  // }
}
