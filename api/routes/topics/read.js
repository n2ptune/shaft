import { readTopicByID, readAllTopics } from '../../models/topics/index'

export const topicByID = function(req, res) {
  const { id } = req.params

  readTopicByID(parseInt(id), (error, result) => {
    if (error) {
      return res.status(400).end()
    } else {
      return res.status(200).send(result)
    }
  })
}

export const allTopics = function(req, res) {
  const { offset } = req.query

  readAllTopics(parseInt(offset), (error, result) => {})
}
