import db from '../../db/connection'

export const findByEmail = async (email) => {
  if (!email) return

  try {
    const [rows] = await db.query(`SELECT * FROM TEST_USER WHERE email = ?`, [
      email
    ])
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

  const SQL = `SELECT user.id userID,
	  user.avatar avatar,
    user.nickname nickname,
    user.email email,
    user.introduce introduce,
    CONVERT_TZ(user.createdAt, '-09:00', 'GMT') createdAt,
	  COUNT(DISTINCT topics.id) AS topicsCount,
    COUNT(DISTINCT comments.id) AS commentsCount,
    COUNT(DISTINCT likes.id) AS likesCount
  FROM TEST_USER user
  LEFT JOIN TEST_TOPICS topics
    ON (topics.ownerID = user.id AND topics.isDel IS FALSE)
  LEFT JOIN TEST_COMMENTS comments
    ON (comments.ownerID = user.id)
  LEFT JOIN TEST_TOPICS_LIKE likes
    ON (likes.topicID = topics.id AND topics.ownerID = user.id)
  WHERE user.id = ?
  GROUP BY user.id`

  try {
    const [rows] = await db.query(SQL, [id])

    if (!rows.length) {
      return callback(new Error('Not Found User'), null)
    }

    const tagSQL = `SELECT topics.id,
      topics.parentTopicID parentTopicID,
      topics.title topicTitle,
      topics.content topicContent,
      topics.originCategoryID originCategoryID,
      topics.subCategoryID subCategoryID,
      CONVERT_TZ(topics.createdAt, '-09:00', 'GMT') createdAt,
      o_category.name originCategoryName,
      GROUP_CONCAT(DISTINCT s_category.name ORDER BY s_category.id) subCategoryName
    FROM TEST_TOPICS topics
    LEFT JOIN TEST_TOPICS_CATEGORY o_category
      ON topics.originCategoryID = o_category.id
    LEFT JOIN TEST_TOPICS_SUB_CATEGORY s_category
      ON FIND_IN_SET(s_category.id, topics.subCategoryID) > 0
    WHERE (topics.ownerID = ? AND topics.isDel IS FALSE)
    GROUP BY topics.id;`

    const [tagRows] = await db.query(tagSQL, [id])

    // 데이터 종합
    const result = {
      profile: null,
      tags: [],
      topics: []
    }

    result.profile = rows[0]

    // TODO: 태그 값 내보내기
    tagRows.forEach((tag) => {
      tag.topicContent = tag.topicContent.replace(/(<([^>]+)>)/gi, '')

      // 태그가 자식 토픽이면
      if (tag.parentTopicID) {
        tag.topicTitle =
          tag.topicContent.length > 50
            ? tag.topicContent.substring(0, 50)
            : tag.topicContent
      }

      // 토픽 배열에 넣기
      result.topics.push({
        id: tag.id,
        parentTopicID: tag.parentTopicID,
        title: tag.topicTitle,
        content: tag.topicContent,
        createdAt: tag.createdAt
      })

      if (tag.originCategoryID) {
        const target = result.tags.find(
          (item) => item.title === tag.originCategoryName
        )

        if (target !== undefined) {
          target.count = target.count + 1
        } else {
          result.tags.push({
            title: tag.originCategoryName,
            count: 1,
            id: tag.originCategoryID
          })
        }
      }

      if (tag.subCategoryID) {
        const splitedID = tag.subCategoryID.split(',')
        const splitedName = tag.subCategoryName.split(',')

        splitedID.forEach((item, index) => {
          const target = result.tags.find(
            (el) => el.title === splitedName[index]
          )

          if (target !== undefined) {
            target.count = target.count + 1
          } else {
            result.tags.push({
              title: splitedName[index],
              count: 1,
              id: parseInt(item)
            })
          }
        })
      }
    })

    callback(null, result)
  } catch (error) {
    callback(error, null)
  }
}

export const findAllUser = async (page, cb) => {
  const limitPerPage = 12

  const SQL = `SELECT user.id userID,
    user.nickname userNickname,
    user.email userEmail,
    user.avatar userAvatar,
    COUNT(DISTINCT topics.id) topicsCount,
    COUNT(DISTINCT comments.id) commentsCount,
    COUNT(DISTINCT likes.id) likesCount
  FROM TEST_USER user
  LEFT JOIN TEST_TOPICS topics
    ON (topics.ownerID = user.id AND topics.isDel IS FALSE)
  LEFT JOIN TEST_COMMENTS comments
    ON (comments.ownerID = user.id)
  LEFT JOIN TEST_TOPICS_LIKE likes
	  ON (likes.topicID = topics.id AND topics.ownerID = user.id)
  GROUP BY user.id
  ORDER BY user.id ASC
  LIMIT ${(parseInt(page) - 1) * limitPerPage}, ${limitPerPage};`

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
      pages: Math.ceil(countRows[0].userCount / limitPerPage)
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
