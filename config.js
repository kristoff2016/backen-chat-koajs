exports.app = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000
}

exports.db = {
  uri: process.env.DB_URI || ''
}

exports.jwt = {
  secret: process.env.SECRET || 'not-a-secret-key'
}
