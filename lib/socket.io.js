const SocketIO = require('socket.io')

/**
 * Default Namespace: io || io.of('/') // public namespace
 * Auth Namespace: io.of('/auth') // protected namespace
 */
module.exports = (app, server) => {
  // Default Namespace
  const io = new SocketIO(server)

  io.use((socket, next) => next())

  io.on('connection', function (socket) {
    console.log('socket', socket.id)

    socket.on('disconnect', () => console.log(`${socket.id} went offline.`))
  })

  // Auth Namespace
  const ioAuth = io.of('/auth')

  ioAuth.use((socket, next) => next())

  ioAuth.on('connection', function (socket) {
    console.log('socket in ioAuth', socket.id)
  })

  app.context.io = io
  app.context.ioAuth = ioAuth
}
