import bcrypt from 'bcrypt'
import db from '../../db/connection'
import { ValidateError } from '../../utils/errors/error'
import { validatePassword } from './validate-universal'

/**
 * Insert information of user into user table
 * @param {String} nickname
 * @param {String} email
 * @param {String} password
 * @param {Function} cb
 */
export const createUser = async (nickname, email, password, date, cb) => {
  // validate password
  if (validatePassword(password)) {
    const sql = `INSERT INTO TEST_USER (nickname, email, password, avatar, createdAt) VALUES (?, ?, ?, ?, ?)`
    const saltRounds = 8

    try {
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)
      const avatar = `https://api.adorable.io/avatars/100/${nickname}@${nickname}`

      await db.query(sql, [nickname, email, hash, avatar, date])
      cb(null, true)
    } catch (error) {
      cb(new Error(error.message), false)
    }
  } else {
    cb(new ValidateError('패스워드 검증 실패'), false)
  }
}
