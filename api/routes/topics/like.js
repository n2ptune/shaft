import { likeTopic } from '../../models/topics/index'

export default function(req, res) {
  // 요청 본문에서 토픽 아이디 가져오기
  const { topicID } = req.body

  likeTopic(topicID, res.locals.user, (error, result) => {
    if (error) {
      return res.status(500).end()
    } else {
      return res.status(200).send(result)
    }
  })
}
