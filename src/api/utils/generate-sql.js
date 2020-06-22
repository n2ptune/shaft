class SQLGenerator {
  constructor() {
    this.sql = ''
  }

  getSQL() {
    return this.sql || new Error('Empty SQL')
  }

  select() {}

  where() {}

  from() {}
}

export default SQLGenerator
