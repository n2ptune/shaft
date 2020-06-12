import db from '../../db/connection'
import { multipleCondition } from '../../utils/multiple-sql'

/**
 * @param {Number[]} topicID
 * @param {Function} cb
 */
export const getCommentsByTopicID = async (topicID, cb) => {
  const defaultSQL = `
  SELECT
  comments.id commentID,
  comments.content commentContent,
  comments.ownerID commentOwnerID,
  comments.topicID targetTopicID,
  CONVERT_TZ(comments.createdAt, '-09:00', 'GMT') AS createdAt,
  user.avatar userAvatar
  FROM TEST_COMMENTS comments
  LEFT JOIN TEST_USER user
  ON comments.ownerID = user.id
  `

  const condition = multipleCondition(topicID, 'comments.topicID')
  const SQL = defaultSQL + condition

  try {
    const [rows] = await db.query(SQL)

    cb(null, rows)
  } catch (error) {
    cb(error, null)
  }
}

export const writeComment = () => {}
