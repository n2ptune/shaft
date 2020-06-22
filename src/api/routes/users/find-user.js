import { findByID } from '../../models/user/find'

export default function(req, res) {
  const { id } = req.params

  if (!id) return res.status(400).end()

  try {
    findByID(id, (error, user) => {
      if (error) {
        return res.status(400).end()
      }
      return res.status(200).send(user)
    })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
