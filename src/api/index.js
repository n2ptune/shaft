import express from 'express'

import authRouter from './routes/auth/index'
import topicsRouter from './routes/topics/index'
import usersRouter from './routes/users/index'
import commentsRouter from './routes/comments/index'

// 경고 문구 회피
// https://github.com/expressjs/morgan/issues/190
const morgan = require('morgan')
const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRouter)
app.use('/topics', topicsRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRouter)

// error
app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

export default app
