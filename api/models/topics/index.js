import db from '../../db/connection'
import parseDate from '../../utils/parse-date'

export const readAllTopics = () => {}

export const writeTopic = async ({ title, content }, { userID }) => {
  const SQL = `INSERT INTO ${process.env.DB_TOPIC_TABLE}
  (title, createdAt, content, ownerID)
  VALUES(?, ?, ?, ?)`

  const date = parseDate()

  try {
    await db.query(SQL, [title, date, content, userID])
  } catch (error) {
    throw new Error(error)
  }
}
