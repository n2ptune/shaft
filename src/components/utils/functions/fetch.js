/**
 * @typedef {import('axios').AxiosInstance} AxiosInstance
 * @param {AxiosInstance} axios
 * @param {Number} categoryID
 * @param {Number} offset
 * @param {String} path
 */
async function fetchCategoryTopics(axios, categoryID, offset, path) {
  if (!offset) offset = 1

  const url = `/api/topics/category/${categoryID}?p=${offset}`
  let isOrigin = null

  if (/\/(category)\//.test(path)) {
    isOrigin = true
  } else if (/\/(sub-category)\//.test(path)) {
    isOrigin = false
  } else {
    return new Error('정상 경로가 아님')
  }

  try {
    const { data } = await axios.get(url, {
      headers: {
        'X-Origin-Category': isOrigin ? 1 : 0
      }
    })

    return data
  } catch (fetchError) {
    throw new Error(fetchError)
  }
}

export { fetchCategoryTopics }
