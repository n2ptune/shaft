import db from '../../db/connection'

export const readTopicByID = async (id, cb) => {
  if (!id) {
    throw new Error('Not Given ID')
  }

  try {
    const [row] = await db.query(`CALL readTopicByID(${id})`)

    cb(null, row[0][0])
  } catch (error) {
    cb(error, null)
  }
}

export const readAllTopics = async (offset, cb) => {
  const SQL = ``

  try {
    const [rows] = await db.query()
  } catch (error) {
    throw new Error(error)
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
