import { deleteComment } from '../../models/comments/index'

export default function(req, res) {
  const { id } = req.params

  // 잘못된 요청 핸들링
  if (!id || !res.locals.user) {
    return res.status(400).end()
  }

  deleteComment(res.locals.user, { commentID: id }, (error, result) => {
    if (error || !result) {
      return res.status(500).end()
    } else {
      return res.status(200).end()
    }
  })
}
