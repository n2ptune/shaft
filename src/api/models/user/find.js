import db from '../../db/connection'

export const findByEmail = async (email) => {
  if (!email) return

  try {
    const [
      rows
    ] = await db.query(
      `SELECT * FROM ${process.env.DB_USER_TABLE} WHERE email = ?`,
      [email]
    )
    if (!rows.length) {
      throw new Error('Not Found Email')
    }
    return rows[0]
  } catch (error) {
    return error
  }
}

export const findByID = async (id, callback) => {
  if (!id) return

  const SQL = `SELECT id, email, nickname, avatar
  FROM ${process.env.DB_USER_TABLE}
  WHERE id = ?`

  try {
    const [rows] = await db.query(SQL, [id])

    if (!rows.length) {
      return callback(new Error('Not Found User'), null)
    }

    return callback(null, rows[0])
  } catch (error) {
    return callback(error, null)
  }
}

export const findAllUser = async (page, cb) => {
  const SQL = `SELECT user.id userID,
    user.nickname userNickname,
    user.email userEmail,
    user.avatar userAvatar,
    COUNT(DISTINCT topics.id) topicsCount,
    COUNT(DISTINCT comments.id) commentsCount
  FROM TEST_USER user
  LEFT JOIN TEST_TOPICS topics
    ON (topics.ownerID = user.id AND topics.isDel IS FALSE)
  LEFT JOIN TEST_COMMENTS comments
    ON (comments.ownerID = user.id)
  GROUP BY user.id
  ORDER BY user.createdAt DESC
  LIMIT ${(parseInt(page) - 1) * 10}, 10;`

  const countSQL = `SELECT COUNT(*) userCount FROM TEST_USER;`

  try {
    const [rows] = await db.query(SQL)
    const [countRows] = await db.query(countSQL)

    const result = {
      users: {
        data: rows,
        count: rows.length
      },
      userCount: countRows[0].userCount,
      currentPage: parseInt(page),
      pages: Math.ceil(countRows[0].userCount / 10)
    }

    // 페이지 범위를 초과한 요청
    if (page > result.pages) {
      throw new Error('RangeError')
    }

    cb(null, result)
  } catch (error) {
    cb(error, null)
  }
}
