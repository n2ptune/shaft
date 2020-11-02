import bcrypt from 'bcrypt'
import db from '../../db/connection'
import { ValidateError } from '../../utils/errors/error'
import generateHex from '../../utils/generate-hex'
import { validatePassword } from './validate-universal'

/**
 * Insert information of user into user table
 * @param {string} nickname
 * @param {string} email
 * @param {string} password
 * @param {function} cb
 */
export const createUser = async (nickname, email, password, date, cb) => {
  // validate password
  if (validatePassword(password)) {
    const sql = `INSERT INTO TEST_USER (nickname, email, password, avatar, createdAt) VALUES (?, ?, ?, ?, ?)`
    const saltRounds = 8

    try {
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)
      const avatar = generateHex()

      await db.query(sql, [nickname, email, hash, avatar, date])
      cb(null, true)
    } catch (error) {
      cb(new Error(error.message), false)
    }
  } else {
    cb(new ValidateError('패스워드 검증 실패'), false)
  }
}
