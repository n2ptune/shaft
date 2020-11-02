import { topicDataToUpdateByID, updateTopicByID } from '../../models/topics'
import { validateTopic } from '../../models/topics/validate'
import { extract } from '../../utils/extract-category'

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

export const updateTopic = (req, res) => {
  const { id, title, content, date, categories, parent } = req.body

  // 검증 실패
  if (!validateTopic({ title, date, content, isReply: !!parent })) {
    return res.status(400).end()
  } else {
    const category = extract(categories)

    const topic = {
      id,
      title,
      content,
      date,
      category,
      parent
    }

    // TODO: Should be complete this line
    updateTopicByID(topic, res.locals.user, (error, result) => {
      if (error) {
        return res.status(500).end()
      } else {
        return res.status(200).send(result)
      }
    })
  }
}
