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

  const { title, content, categories, date } = req.body

  // 검증
  if (!validateTopic({ title, date, content })) {
    return res.status(400).end()
  } else {
    // 검증됨
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
      const { id } = await writeTopic({ title, date, content, category }, user)

      return res.status(201).send({
        status: 'success',
        topic: {
          id
        }
      })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }
}
