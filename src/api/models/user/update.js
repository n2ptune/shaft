import db from '../../db/connection'

export const updateRefreshToken = async ({ id, nickname, email }, token) => {
  const SQL = `UPDATE ${process.env.DB_USER_TABLE}
  SET token = ?
  WHERE id = ? AND nickname = ? AND email = ?`

  await db.query(SQL, [token, id, nickname, email])
}
