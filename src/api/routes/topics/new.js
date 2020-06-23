import { writeTopic } from '../../models/topics/index'
import { validateTopic } from '../../models/topics/validate'
import parseToken from '../../utils/parse-authorization'
import { decodeToken } from '../../models/user/token'

export default async function(req, res) {
  let token

  if (res.locals.token) {
    res.append('x-www-access-token', res.locals.token)
    token = res.locals.token
  } else {
    token = parseToken(req.headers.authorization)
  }

  const user = decodeToken(token)

  if (!token || !user) {
    return res.status(500).end()
  }

  const { title, content, categories, date, parent } = req.body

  // 검증
  if (!validateTopic({ title, date, content, isReply: !!parent })) {
    return res.status(400).end()
  } else {
    const category = {
      origin: [],
      sub: []
    }

    categories.origin.map((origin) => category.origin.push(origin.id))
    categories.sub.map((sub) => category.sub.push(sub.id))

    for (const key in category) {
      if (category[key].length) {
        category[key] = category[key].join(',')
      } else {
        category[key] = null
      }
    }

    try {
      const topic = await writeTopic(
        { title, date, content, category, parent },
        user
      )

      return res.status(200).send({
        status: 'success',
        topic
      })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }
}
