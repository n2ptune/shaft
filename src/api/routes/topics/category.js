import { getCategories } from '../../models/topics/category'

export default function(req, res) {
  getCategories((error, results) => {
    if (error) {
      return res.status(500).send({ message: 'database error' })
    } else {
      return res.status(200).send(results)
    }
  })
}
