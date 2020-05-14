import { compare } from 'bcrypt'

export const comparePassword = async (password, hash) => {
  // compare(password, hash, (err, result) => {
  //   if (err) {
  //     cb(new Error('Compare Error'), null)
  //   } else {
  //     cb(null, result)
  //   }
  // })
  const isSame = await compare(password, hash)
  return isSame
}
