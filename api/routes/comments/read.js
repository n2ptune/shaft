import { getCommentsByTopicID } from '../../models/comments/index'

export default function(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).end()
  }

  getCommentsByTopicID([id], (error, result) => {
    if (error) {
      return res.status(500).end()
    } else {
      return res.status(200).end()
    }
  })
}
