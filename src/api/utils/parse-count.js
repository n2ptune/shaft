/**
 * @param {object[]} result
 */
export const parseCount = (result) => {
  if (!result.length) return false

  return parseInt(result[0]['COUNT(*)']) > 0
}
