import express from 'express'
import morgan from 'morgan'

import authRouter from './routes/auth/index'
import topicsRouter from './routes/topics/index'
import usersRouter from './routes/users/index'

const app = express()

app.use(morgan('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRouter)
app.use('/topics', topicsRouter)
app.use('/users', usersRouter)

// error
app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

export default app
