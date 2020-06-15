import { decode, sign, verify } from 'jsonwebtoken'
import { updateRefreshToken } from './update'

export const signAccessTokenWithRT = (refreshToken) => {
  if (typeof refreshToken === 'object') {
    refreshToken = refreshToken.token
  }

  try {
    // 리프레쉬 토큰 만료시 여기서 오류 발생
    verifyToken(refreshToken)

    const decoded = decode(refreshToken)
    const userData = {
      email: decoded.email,
      id: decoded.id,
      nickname: decoded.nickname,
      avatar:
        decoded.avatar ||
        'https://www.yourfirstpatient.com/assets/default-user-avatar-thumbnail-117c4e02d0bee9a424842ebb2a903cf71468999f79ce30bad99c07f100764064.png'
    }

    const accessToken = sign(userData, process.env.PRIVATE_KEY, {
      expiresIn: '30m',
      issuer: '.shaft.kr'
    })

    return accessToken
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('RefreshTokenExpired')
    } else {
      throw new Error(error)
    }
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

export const decodeToken = (token) => {
  return decode(token)
}
