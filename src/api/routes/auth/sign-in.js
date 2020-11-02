import {
  validateEmail,
  validatePassword
} from '../../models/user/validate-universal'
import { findByEmail } from '../../models/user/find'
import { comparePassword } from '../../models/user/compare'
import {
  signRefreshToken,
  signAccessTokenWithRT
} from '../../models/user/token'

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
      id: user.id,
      nickname: user.nickname,
      avatar: user.avatar
    }

    signRefreshToken(userData, (err, token) => {
      if (err || !token) {
        return res.status(500).send({ message: err })
      } else {
        const accessToken = signAccessTokenWithRT(token)
        return res.status(200).send({ accessToken })
      }
    })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}
