async function fetchCategoryTopics(axios, categoryID, offset) {
  if (!offset) offset = 1

  const url = `/api/topics/category/${categoryID}?p=${offset}`

  try {
    const { data: topics } = await axios.get(url)

    return topics
  } catch (fetchError) {
    throw new Error(fetchError)
  }
}

export { fetchCategoryTopics }
