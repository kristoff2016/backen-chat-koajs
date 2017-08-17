const { NODE_ENV = 'development', PORT = 5000, DB_URI = '' } = process.env // es6 destructuring

exports.app = {
  env: NODE_ENV,
  port: PORT
}

exports.db = {
  uri: DB_URI
}
