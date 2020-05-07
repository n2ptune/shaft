/**
 * Validate password with regex
 * Least 8 characters
 * Contains lowercase characters (not and uppercase characters)
 * Contains least 1 special character (#?!@$... etc)
 * @param {String} password
 * @returns {boolean}
 */
export const validatePassword = (password) => {
  return /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password)
}

export const validateNickname = (nickname) => {
  return !(nickname.length < 5 || nickname.length > 12)
}

export const validateEmail = (email) => {
  return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
    email
  )
}
