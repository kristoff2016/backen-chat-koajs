/// <reference path="./typings/modules/sequelize/index.d.ts" />
const env = require('dotenv')
env.config()

require('./lib/database')
const server = require('./lib/server')
const config = require('./config')

const { app: { port } } = config
;(async () => {
  try {
    // await global.db.sync({ force: false, logging: false })
    await global.db.authenticate()
    server.listen(port, () => console.log(`Server running on port ${port}`))
  } catch (e) {
    console.error(e)
  }
})()
