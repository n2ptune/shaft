export default class ValidateError extends Error {
  constructor(...params) {
    super(...params)

    // default 1
    this.code = 1
  }
}
