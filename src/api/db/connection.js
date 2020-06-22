import mysql2 from 'mysql2/promise'
import 'dotenv/config'

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionLimit: 10,
  waitForConnections: true
}

export default mysql2.createPool(config)
