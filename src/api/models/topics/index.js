import db from '../../db/connection'

export const readTopicByID = async (id, cb) => {
  if (!id) {
    cb(new Error('Not Given ID'), null)
  }

  try {
    const [rows] = await db.query(`CALL readTopicByID(${id})`)

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

export const readAllTopics = async (offset, cb) => {
  const SQL = `CALL readTopicByOffset(${offset})`

  try {
    const [rows] = await db.query(SQL)
    cb(null, rows[0])
  } catch (error) {
    cb(error, null)
  }
}

export const writeTopic = async (topic, user) => {
  const SQL = `INSERT INTO ${process.env.DB_TOPIC_TABLE}
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

    console.log(result)

    return {
      id: result.insertId
    }
  } catch (error) {
    throw new Error('Write Topic Error')
  }
}

export const countOfTopics = async () => {
  try {
    const SQL = `CALL getCountOfTopics();`
    const [result] = await db.query(SQL)

    if (!result.length) throw new Error('Database Error')

    return result[0][0].count
  } catch (error) {
    throw new Error(error)
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
