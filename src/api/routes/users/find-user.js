import { findAllUser, findByID } from '../../models/user/find'

function findAllUserByPageController(req, res) {
  const { p: page } = req.query

  if (!parseInt(page)) {
    return res.status(400).send({
      message: '잘못된 페이지 범위 요청'
    })
  }

  findAllUser(page, (error, result) => {
    if (error) {
      if (error.message === 'RangeError') {
        return res.status(400).send({
          message: '페이지 범위 초과',
          statusCode: 400
        })
      }
      return res.status(500).end()
    } else {
      return res.status(200).send(result)
    }
  })
}

function findUserByIDController(req, res) {
  const { id } = req.params

  if (!id) return res.status(400).end()

  try {
    findByID(id, (error, user) => {
      if (error) {
        return res.status(400).end()
      }
      return res.status(200).send(user)
    })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export { findAllUserByPageController, findUserByIDController }
