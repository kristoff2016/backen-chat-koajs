const http = require('http')
const app = require('./app')
const path = require('path')
const { setupSocketIOControllers } = require('socket.io-controllers')

const server = http.createServer(app.callback())

app.context.io = setupSocketIOControllers({
  server,
  controllers: {
    dir: path.resolve('.', 'app/socket-controllers')
  }
})

module.exports = server
