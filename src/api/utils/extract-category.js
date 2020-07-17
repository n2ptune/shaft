export function extract(categories) {
  const category = {
    origin: [],
    sub: []
  }

  categories.origin.map((origin) => category.origin.push(origin.id))
  categories.sub.map((sub) => category.sub.push(sub.id))

  for (const key in category) {
    if (category[key].length) {
      category[key] = category[key].join(',')
    } else {
      category[key] = null
    }
  }

  return category
}
