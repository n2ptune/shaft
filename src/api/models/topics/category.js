import db from '../../db/connection'

export const getCategories = async (callback) => {
  const typeEnum = {
    category: 1,
    sub: 0
  }

  try {
    const SQL = `SELECT cat.id, cat.name, cat.type FROM TEST_TOPICS_CATEGORY as cat
    UNION
    SELECT subcat.id, subcat.name, subcat.type FROM TEST_TOPICS_SUB_CATEGORY as subcat`
    const [rows] = await db.query(SQL)

    const extractCategory = rows.filter((row) => row.type === typeEnum.category)
    const extractSubCategory = rows.filter((row) => row.type === typeEnum.sub)

    const category = {
      category: extractCategory,
      sub: extractSubCategory
    }

    return callback(null, category)
  } catch (error) {
    return callback(error, null)
  }
}
