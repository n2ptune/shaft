import db from '../../db/connection'

export const getCommentsByTopicID = async (topicID, cb) => {
  const SQL = `CALL readCommentsByID(${parseInt(topicID)})`

  try {
    const [rows] = await db.query(SQL)

    console.log(rows)

    cb(null, rows[0])
  } catch (error) {
    cb(error, null)
  }
}

export const writeComment = () => {}
