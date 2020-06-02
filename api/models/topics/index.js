import db from '../../db/connection'

export const readTopicByID = (id) => {}

export const readAllTopics = () => {}

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
