import {
  validateEmail,
  validatePassword
} from '../../models/user/validate-universal'
import { findByEmail } from '../../models/user/find'
import { comparePassword } from '../../models/user/compare'

export default async function(req, res) {
  const { email, password } = req.body.data

  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).end()
  }

  try {
    const user = await findByEmail(email)
    const isSame = await comparePassword(password, user.password)

    if (!isSame) {
      throw new Error('비밀번호가 틀렸습니다.')
    }

    const userData = {
      email: user.email,
      nickname: user.nickname
    }

    res.status(200).send(userData)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}
