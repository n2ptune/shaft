import bcrypt from 'bcrypt'
import db from '../../db/connection'
import ValidateError from '../../utils/errors/validate'
import { validatePassword } from './validate-universal'
import { signRefreshToken } from './token'

/**
 * Insert information of user into user table
 * @param {String} nickname
 * @param {String} email
 * @param {String} password
 * @param {Function} cb
 */
export const createUser = async (nickname, email, password, cb) => {
  // validate password
  if (validatePassword(password)) {
    const sql = `INSERT INTO ${process.env.DB_USER_TABLE} (nickname, email, password, token) VALUES (?, ?, ?, ?)`
    const saltRounds = 8

    try {
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)
      const refreshToken = signRefreshToken()

      await db.query(sql, [nickname, email, hash, refreshToken])
      cb(null, true)
    } catch (error) {
      cb(new Error(error.message), false)
    }
  } else {
    cb(new ValidateError('패스워드 검증 실패'), false)
  }
}
