import { validateNicknameAndEmail } from '../../models/user/validate'
import { createUser } from '../../models/user/create'
import ValidateError from '../../utils/errors/validate'

export default function(req, res) {
  const { nickname, email, password } = req.body.data

  validateNicknameAndEmail(nickname, email, (error, possible) => {
    if (error) {
      if (error instanceof ValidateError) {
        res.status(400).send({
          code: error.code,
          message: error.message
        })
      } else {
        res.status(500).send({
          message: '서버 내부 에러'
        })
      }
    } else if (!possible) {
      res.status(400).send({
        message: '닉네임 혹은 이메일이 이미 존재합니다.'
      })
    } else {
      createUser(nickname, email, password, (error, success) => {
        if (error || !success) {
          res.status(500).send({
            message: '회원가입 불가능'
          })
        } else {
          res.status(201).end()
        }
      })
    }
  })
}
