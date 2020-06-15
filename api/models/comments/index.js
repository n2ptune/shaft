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
  user.avatar userAvatar,
  user.nickname userNickname
  FROM TEST_COMMENTS comments
  LEFT JOIN TEST_USER user
  ON comments.ownerID = user.id
  `

  const nextSQL = 'ORDER BY comments.createdAt DESC'
  const condition = multipleCondition(topicID, 'comments.topicID', nextSQL)
  const SQL = defaultSQL + condition

  try {
    const [rows] = await db.query(SQL)

    cb(null, rows)
  } catch (error) {
    cb(error, null)
  }
}

export const writeComment = async (
  userData,
  { topicID, comment, date },
  cb
) => {
  const { id: userID } = userData

  const SQL = `
  INSERT INTO TEST_COMMENTS
  (content, ownerID, createdAt, topicID)
  VALUES
  (?, ?, ?, ?)
  `

  try {
    // 댓글 집어넣기
    await db.query(SQL, [comment, userID, date, topicID])

    // 댓글 가져오기
    getCommentsByTopicID([topicID], (error, result) => {
      if (error) {
        return cb(error, null)
      } else {
        return cb(null, result)
      }
    })
  } catch (error) {
    return cb(error, null)
  }
}
