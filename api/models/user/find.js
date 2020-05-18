import db from '../../db/connection'
import 'dotenv/config'

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