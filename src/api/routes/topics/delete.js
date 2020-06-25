import { deleteTopic } from '../../models/topics/index'
import { DatabaseError } from '../../utils/errors/error'

export default function(req, res) {
  const { id } = req.params
  const user = res.locals.user

  // 토픽 아이디 혹은 유저 정보가 없을 시
  if (!id || !user) {
    return res.status(400).end()
  }

  deleteTopic(id, user, (error, result) => {
    if (error) {
      if (error instanceof DatabaseError) {
        return res.status(400).end()
      } else {
        return res.status(500).end()
      }
    } else {
      return res.status(204).end()
    }
  })
}
