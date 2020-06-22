import { updateComment } from '../../models/comments/index'

export default function(req, res) {
  if (!res.locals.user) {
    return res.status(401).end()
  }

  const { commentID: id, updatedComment: comment, date } = req.body

  if (!id || !comment) {
    return res.status(400).end()
  }

  updateComment(res.locals.user, { id, comment, date }, (error, result) => {
    if (error) {
      console.log(error)
      return res.status(500).end()
    } else if (result) {
      console.log(result)
      return res.status(200).send(result)
    }
  })
}
