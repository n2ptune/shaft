/**
 * @param {number[]} list
 * @param {string} compareVar
 * @param {boolean} or
 */
export const multipleCondition = (
  list,
  compareVar,
  nextSQL = '',
  or = true
) => {
  const condition = or ? 'OR' : 'AND'
  let result = 'WHERE '
  list.forEach((val) => (result += `${compareVar} = ${val} ${condition} `))

  return (
    result.substring(0, result.length - (condition.length + 2)).trim() +
    ' ' +
    nextSQL +
    ';'
  )
}
