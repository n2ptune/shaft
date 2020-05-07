import db from '../../db/connection'
import { parseCount } from '../../utils/parse-count'
import ValidateError from '../../utils/errors/validate'

/**
 * Validate nickname and email from database
 * @param {String} nickname
 * @param {String} email
 * @param {Function} cb
 * Callback has two arguments (error, result) result: Boolean
 * If error is falsy value then result is true or false
 * But If error is truthy value then result is always null
 */
export const validateNicknameAndEmail = async (nickname, email, cb) => {
  if (nickname.length < 5 || nickname.length > 12) {
    return cb(new ValidateError('닉네임 길이 검증 실패'))
  }

  const isCorrectEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
    email
  )

  if (!isCorrectEmail) {
    return cb(new ValidateError('유효한 이메일이 아님'))
  }

  const sql = `SELECT COUNT(*) FROM ${process.env.DB_USER_TABLE} WHERE nickname = ? OR email = ?`

  try {
    const [rows] = await db.query(sql, [nickname, email])

    if (parseCount(rows)) {
      return cb(null, false)
    } else {
      return cb(null, true)
    }
  } catch (error) {
    return cb(error, null)
  }
}
