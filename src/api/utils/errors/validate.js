export default class ValidateError extends Error {
  constructor(message) {
    super(message)

    // default 1
    this.code = 1
    this.name = 'ValidateError'
  }
}
