import {
  validateEmail,
  validatePassword
} from '../../models/user/validate-universal'

export default function(req, res) {
  const { email, password } = req.body.data

  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).end()
  }
}
