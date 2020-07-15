import {
  topicDataToUpdateByID,
  updateTopicByID
} from '../../models/topics/index'

export const topicDataToUpdate = (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).end()
  }

  topicDataToUpdateByID(id, res.locals.user, (error, result) => {
    if (error) {
      switch (error.message) {
        case 'NotOwnerError':
          return res.status(403).end()
        case 'NotFoundTopic':
          return res.status(404).end()
        default:
          return res.status(500).end()
      }
    } else {
      return res.status(200).send(result)
    }
  })
}

export const updateTopic = (req, res) => {}
