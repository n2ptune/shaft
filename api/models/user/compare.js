import { compare } from 'bcrypt'

export const comparePassword = (password, hash, cb) => {
  compare(password, hash, (err, result) => {
    if (err) {
      cb(new Error('Compare Error'), null)
    } else {
      cb(null, result)
    }
  })
}
