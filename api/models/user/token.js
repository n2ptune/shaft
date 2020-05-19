// eslint-disable-next-line
import { decode, sign, verify } from 'jsonwebtoken'
import { updateRefreshToken } from './update'

export const signAccessTokenWithRT = (refreshToken) => {
  if (verifyToken(refreshToken)) {
    const decoded = decode(refreshToken)
    const userData = {
      email: decoded.email,
      id: decoded.id,
      nickname: decoded.nickname,
      // test!!!
      avatar: `https://api.adorable.io/avatars/100/${decoded.nickname}@${decoded.nickname}`
    }

    const accessToken = sign(userData, process.env.PRIVATE_KEY, {
      expiresIn: '1h',
      issuer: '.shaft.kr'
    })

    return accessToken
  } else {
    throw new Error('Invalid Refresh Token')
  }
}

export const signRefreshToken = (userData, callback) => {
  sign(
    userData,
    process.env.PRIVATE_KEY,
    {
      expiresIn: '7d',
      issuer: '.shaft.kr'
    },
    (err, token) => {
      if (err) return callback(err, null)
      else {
        updateRefreshToken(userData, token)
        return callback(null, token)
      }
    }
  )
}

export const verifyToken = (token) => {
  return verify(token, process.env.PRIVATE_KEY)
}

// export const decodeToken = (token) => {
//   return decode(token)
// }
