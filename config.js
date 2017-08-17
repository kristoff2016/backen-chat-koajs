const {
  NODE_ENV = 'development',
  PORT = 5000,
  DB_URI = 'mysql://b7s5u0xkwiyxsv6w:jddl4j3isvqbf3j1@cdm1s48crk8itlnr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/u9dp4n7omoxst4ed'
} = process.env // es6 destructuring

exports.app = {
  env: NODE_ENV,
  port: PORT
}

exports.db = {
  uri: DB_URI
}
