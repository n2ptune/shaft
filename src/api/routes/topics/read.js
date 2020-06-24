import {
  readTopicByID,
  readAllTopics,
  countOfTopics
} from '../../models/topics/index'
import { getCommentsByTopicID } from '../../models/comments/index'

export const topicByID = function(req, res) {
  const { id } = req.params

  readTopicByID(parseInt(id), (error, data) => {
    if (error) {
      return res.status(400).end()
    } else {
      const flatSubCategories = (result) => {
        result.sub = []
        // 서브 카테고리가 여러 개일 경우
        if (result.subCategoryID && result.subCategoryID.includes(',')) {
          const splitedCategoryByID = result.subCategoryID.split(',')
          const splitedCategoryByName = result.subCategories.split(',')

          splitedCategoryByID.forEach((v, index, arr) => {
            result.sub.push({
              id: v,
              name: splitedCategoryByName[index]
            })
          })
        } else if (result.subCategoryID) {
          result.sub.push({
            id: result.subCategoryID,
            name: result.subCategories
          })
        }

        // 불필요한 데이터 삭제
        delete result.subCategories
        delete result.subCategoryID
      }

      flatSubCategories(data.topics.root)

      const allID = []

      allID.push(data.topics.root.id)
      data.topics.children.forEach((t) => {
        allID.push(t.id)
        t.comments = []
      })

      getCommentsByTopicID(allID, (error, comments) => {
        if (error) {
          return res.status(500).end()
        } else if (!comments) {
          return res.status(200).send(data)
        } else {
          data.topics.root.comments = []

          comments.forEach((comment) => {
            if (comment.targetTopicID === data.topics.root.id) {
              data.topics.root.comments.push(comment)
            } else {
              const matchTopic = data.topics.children.filter((topic) => {
                return topic.id === comment.targetTopicID
              })

              matchTopic[0].comments.push(comment)
            }
          })

          return res.status(200).send(data)
        }
      })
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