import { validateNicknameAndEmail } from '../../models/user/validate'
import { createUser } from '../../models/user/create'

export default function(req, res) {
  const { nickname, email, password } = req.body.data

  validateNicknameAndEmail(nickname, email, (error, possible) => {
    if (error) {
      if (error instanceof RangeError) {
        res.status(400).send({
          message: '닉네임 길이 불충분 (5글자 이상 12글자 이하)'
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
      // res.status(200).send({
      //   message: '아이디 / 이메일 / 비밀번호 생성 가능'
      // })
      // TODO add logic that store user data to table
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
