/**
 * @typedef {import('axios').AxiosInstance} AxiosInstance
 * @param {AxiosInstance} axios
 * @param {Number} categoryID
 * @param {Number} offset
 * @param {Boolean} isOrigin
 */
async function fetchCategoryTopics(axios, categoryID, offset, isOrigin) {
  if (!offset) offset = 1

  const url = `/api/topics/category/${categoryID}?p=${offset}`

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
