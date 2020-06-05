import {
  readTopicByID,
  readAllTopics,
  countOfTopics
} from '../../models/topics/index'

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
  let { offset } = req.query

  if (!offset) {
    offset = 0
  }

  readAllTopics(parseInt(offset), async (error, result) => {
    if (error) {
      return res.status(400).end()
    } else {
      try {
        const count = await countOfTopics()
        const head = {}

        head.currentOffset = offset
        head.topicCount = count
        head.pageCount = 1 + parseInt(count / 10)

        const data = {
          topics: result,
          head
        }

        return res.status(200).send(data)
      } catch (error) {
        return res.status(500).end()
      }
    }
  })
}
