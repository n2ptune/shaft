import { decodeToken } from '../../models/user/token'

export default function(req, res) {
  const { token } = req.body.data
  const decoded = decodeToken(token)

  if (decoded) {
    res.status(200).send(decoded)
  } else {
    res.status(400).send({ message: 'error' })
  }
}
