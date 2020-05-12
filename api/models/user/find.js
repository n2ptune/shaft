import db from '../../db/connection'

export const findByEmail = async (email) => {
  if (!email) return

  try {
    const [rows] = await db.query('SELECT * FROM')
  }
}
