import { decodeToken } from '../../models/user/token'

export default function(req, res) {
  // const { token } = req.body.data
  let token = req.headers.authorization

  if (!token) {
    return res.status(401).send({ message: 'Required Access Token' })
  }

  token = token.split('Bearer ')[1]
  const decoded = decodeToken(token)

  if (decoded) {
    res.status(200).send(decoded)
  } else {
    res.status(500).send({ message: 'error' })
  }
}
