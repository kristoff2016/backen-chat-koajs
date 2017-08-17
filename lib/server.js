const http = require('http')
const app = require('./app')
const setupSocketIO = require('./socket.io')

const server = http.createServer(app.callback())

setupSocketIO(app, server)

module.exports = server
