/**
 * @param {string} authorization
 */
export default function(authorization) {
  if (!authorization) {
    return null
  }

  return authorization.split('Bearer ')[1]
}
