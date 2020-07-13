import db from '../../db/connection'
import { DatabaseError, NotFoundError } from '../../utils/errors/error'

async function getCountOfTopics() {
  try {
    const SQL = `CALL getCountOfTopics();`
    const [result] = await db.query(SQL)

    if (!result.length) throw new Error('Database Error')

    return result[0][0].count
  } catch (error) {
    throw new Error(error)
  }
}

async function getCountOfTopicsByCategoryID(categoryID, isOrigin) {
  const procedure = `CALL getCountOfTopicsByCategoryID(${parseInt(
    categoryID
  )}, ${isOrigin})`

  try {
    const [rows] = await db.query(procedure)

    if (rows[0][0].count === undefined) throw new NotFoundError()

    return { count: rows[0][0].count, categoryName: rows[0][0].categoryName }
  } catch (error) {
    if (error instanceof NotFoundError) {
      return new NotFoundError(`${categoryID} 카테고리 아이디를 찾을 수 없음`)
    }
  }
}

export const deleteTopic = async (id, user, cb) => {
  // 토픽 아이디 값과 유저 아이디 값 검증
  const checkSQL = `SELECT COUNT(*) AS selectCount FROM TEST_TOPICS
  WHERE id = ? AND ownerID = ? AND isDel IS FALSE`

  try {
    const [checkResult] = await db.query(checkSQL, [id, user.id])

    if (checkResult[0].selectCount) {
      const deleteSQL = `UPDATE TEST_TOPICS topics
      SET isDel = True
      WHERE id = ? AND ownerID = ? AND isDel IS FALSE`

      await db.query(deleteSQL, [id, user.id])

      cb(null, true)
    } else {
      cb(
        new DatabaseError('게시물이 이미 삭제되었거나 게시물 작성자가 아님'),
        null
      )
    }
  } catch (error) {
    cb(error, null)
  }
}

export const readTopicByID = async (id, cb) => {
  if (!id) {
    cb(new Error('Not Given ID'), null)
  }

  try {
    const [rows] = await db.query(`CALL readTopicByID(${id})`)

    if (!rows[0][0]) {
      throw new NotFoundError('존재하지 않거나 삭제된 토픽')
    }

    const result = {
      topics: {
        root: rows[0][0],
        children: []
      }
    }

    result.topics.children = rows[0].filter((topic) => topic.parentTopicID)

    cb(null, result)
  } catch (error) {
    cb(error, null)
  }
}

export const readTopicByCategoryID = async (
  categoryID,
  offset,
  isOrigin,
  cb
) => {
  const countOfTopicPerPage = 10
  const currentOffset = parseInt(offset - 1) * countOfTopicPerPage
  const SQL = `CALL readTopicByCategoryIDWithOffset(${currentOffset},
    ${categoryID}, ${isOrigin})`

  try {
    const [rows] = await db.query(SQL)
    const countOfTopic = await getCountOfTopicsByCategoryID(
      categoryID,
      isOrigin
    )

    const pageInfo = {
      categoryName: countOfTopic.categoryName,
      currentPage: Math.ceil(countOfTopic.count / currentOffset),
      countOfPage: Math.ceil(countOfTopic.count / countOfTopicPerPage),
      countOfTopic: countOfTopic.count
    }

    // 현재 페이지가 0으로 나눠졌을 경우 (유한수가 아닐 경우)
    if (!isFinite(pageInfo.currentPage)) pageInfo.currentPage = 1

    cb(null, rows[0], pageInfo)
  } catch (error) {
    cb(error, null, null)
  }
}

export const readAllTopics = async (offset, cb) => {
  const countOfTopicPerPage = 10
  const currentOffset = parseInt(offset - 1) * countOfTopicPerPage
  const SQL = `CALL readTopicByOffset(${currentOffset})`

  try {
    const [rows] = await db.query(SQL)
    const countOfTopic = await getCountOfTopics()

    const pageInfo = {
      currentPage: Math.ceil(countOfTopic / currentOffset),
      countOfPage: Math.ceil(countOfTopic / countOfTopicPerPage),
      countOfTopic
    }

    // 현재 페이지가 0으로 나눠졌을 경우 (유한수가 아닐 경우)
    if (!isFinite(pageInfo.currentPage)) pageInfo.currentPage = 1

    cb(null, rows[0], pageInfo)
  } catch (error) {
    cb(error, null)
  }
}

export const writeTopic = async (topic, user) => {
  const SQL = `INSERT INTO TEST_TOPICS
  (title, createdAt, content, ownerID,
    originCategoryID, subCategoryID,
    parentTopicID)
  VALUES
  (?, ?, ?, ?, ?, ?, ?)`

  try {
    const { title, date, content, category, parent } = topic
    const { id } = user

    const [result] = await db.query(SQL, [
      title,
      date,
      content,
      id,
      category.origin,
      category.sub,
      parent
    ])

    if (parent) {
      const nextSQL = `CALL readTopicByID(${result.insertId})`

      const [replyRows] = await db.query(nextSQL)

      return replyRows[0][0]
    } else {
      return {
        id: result.insertId
      }
    }
  } catch (error) {
    throw new Error('Write Topic Error')
  }
}

export const likeTopic = async (topicID, user, cb) => {
  const checkSQL = `SELECT * FROM TEST_TOPICS_LIKE t_like
  WHERE t_like.topicID = ? AND t_like.userID = ?`

  try {
    const [rows] = await db.query(checkSQL, [topicID, user.id])
    let isCanceled = false

    if (!rows.length) {
      // 좋아요 한 기록이 없으면 넣기
      const insertSQL = `INSERT INTO TEST_TOPICS_LIKE
      (topicID, userID)
      VALUES (?, ?)`

      await db.query(insertSQL, [topicID, user.id])
    } else {
      // 좋아요 한 기록이 있으면 취소
      const deleteSQL = `DELETE FROM TEST_TOPICS_LIKE
      WHERE topicID = ? AND userID = ?;`

      await db.query(deleteSQL, [topicID, user.id])

      isCanceled = true
    }

    const nextSQL = `SELECT COUNT(*) likeCount FROM TEST_TOPICS_LIKE t_like
    WHERE t_like.topicID = ?;`

    const [nextResult] = await db.query(nextSQL, topicID)
    const likeCount = nextResult[0].likeCount

    // 결과 취합해서 콜백 호출
    cb(null, { topicID, isCanceled, likeCount })
  } catch (error) {
    // 에러 발생시 에러 객체와 함께 콜백 호출
    cb(error, null)
  }
}
