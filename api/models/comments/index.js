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
  CONVERT_TZ(comments.updatedAt, '-09:00', 'GMT') AS updatedAt,
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

export const updateComment = async (user, { id, comment, date }, cb) => {
  const checkSQL = `SELECT id, ownerID FROM TEST_COMMENTS
  WHERE id = ? AND ownerID = ?`

  try {
    const [rows] = await db.query(checkSQL, [id, user.id])

    if (!rows.length) {
      throw new Error('일치하는 댓글이 없음')
    }

    const nextSQL = `UPDATE TEST_COMMENTS
    SET updatedAt = ?,
        content = ?
    WHERE id = ? AND ownerID = ?`

    await db.query(nextSQL, [date, comment, id, user.id])

    const select = `SELECT comments.id, comments.content,
    comments.ownerID, comments.topicID, topics.parentTopicID as parent,
    CONVERT_TZ(comments.createdAt, '-09:00', 'GMT') as createdAt,
    CONVERT_TZ(comments.updatedAt, '-09:00', 'GMT') as updatedAt
    FROM TEST_COMMENTS comments
    LEFT JOIN TEST_TOPICS topics
    ON topics.id = comments.topicID
    WHERE comments.id = ? AND comments.ownerID = ?`

    const [result] = await db.query(select, [id, user.id])

    if (!result.length) throw new Error('데이터베이스 에러')

    result[0].isRoot = !result[0].parent

    cb(null, result[0])
  } catch (error) {
    cb(error, null)
  }
}

export const deleteComment = async (user, { commentID }, cb) => {
  const checkSQL = `SELECT ownerID FROM TEST_COMMENTS WHERE id = ?`

  try {
    const [checkResults] = await db.query(checkSQL, commentID)

    if (!checkResults.length) {
      throw new Error('')
    }
  } catch (innerError) {}
}
