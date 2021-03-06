export const MIN_TITLE_LENGTH = 5
export const MIN_CONTENT_LENGTH = 10

/**
 * @param {string} date
 */
function validateDate(date) {
  return /[1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9] [0-2][0-9]:[0-5][0-9]:[0-5][0-9]/.test(
    date
  )
}

/**
 * @param {number} length
 * @param {string} val
 * @param {boolean} isContent
 */
function validateLength(length, val, isContent = false, isReply = false) {
  if (isContent) {
    const textWithoutTag = val.replace(/(<([^>]+)>)/gi, '')

    return textWithoutTag.length > length
  } else {
    return isReply ? true : val.length > length
  }
}

export const validateTopic = ({ title, date, content, isReply = false }) => {
  const conditions = [
    validateLength(MIN_TITLE_LENGTH, title, false, isReply),
    validateLength(MIN_CONTENT_LENGTH, content, true, isReply),
    validateDate(date)
  ]

  return !conditions.includes(false)
}
