import express from 'express'
import morgan from 'morgan'

import authRouter from './routes/auth/index'

const app = express()

app.use(morgan('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRouter)

// error
app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

export default app
