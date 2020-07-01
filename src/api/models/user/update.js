import db from '../../db/connection'

export const updateRefreshToken = async ({ id, nickname, email }, token) => {
  const SQL = `UPDATE TEST_USER
  SET token = ?
  WHERE id = ? AND nickname = ? AND email = ?`

  await db.query(SQL, [token, id, nickname, email])
}
