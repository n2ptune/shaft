import { writeComment } from '../../models/comments/index'

export const newComment = (req, res) => {
  if (!res.locals.user) {
    return res.status(400).end()
  }

  // 유저 데이터와 요청 받은 댓글에 관한 정보 넘기고
  // 콜백 전달해서 콜백 실행시키기
  writeComment(res.locals.user, req.body, (error, result) => {
    if (error) {
      return res.status(500).end()
    } else {
      return res.status(200).send(result)
    }
  })
}
