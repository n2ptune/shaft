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
  (title, createdAt, content, ownerID, originCategoryID, subCategoryID)
  VALUES
  (?, ?, ?, ?, ?, ?)`

  try {
    const { title, date, content, category } = topic
    const { id } = user

    const [result] = await db.query(SQL, [
      title,
      date,
      content,
      id,
      category.origin,
      category.sub
    ])

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
