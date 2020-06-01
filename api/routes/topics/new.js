// import { writeTopic } from '../../models/topics/index'

export default function(req, res) {
  if (res.locals.token) {
    res.append('x-www-access-token', res.locals.token)
  }
  res.status(200).end()
}
