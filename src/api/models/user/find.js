import db from '../../db/connection'

export const findByEmail = async (email) => {
  if (!email) return

  try {
    const [
      rows
    ] = await db.query(
      `SELECT * FROM ${process.env.DB_USER_TABLE} WHERE email = ?`,
      [email]
    )
    if (!rows.length) {
      throw new Error('Not Found Email')
    }
    return rows[0]
  } catch (error) {
    return error
  }
}

export const findByID = async (id, callback) => {
  if (!id) return

  const SQL = `SELECT id, email, nickname, avatar
  FROM ${process.env.DB_USER_TABLE}
  WHERE id = ?`

  try {
    const [rows] = await db.query(SQL, [id])

    if (!rows.length) {
      return callback(new Error('Not Found User'), null)
    }

    return callback(null, rows[0])
  } catch (error) {
    return callback(error, null)
  }
}

export const findAllUser = async (callback) => {}
