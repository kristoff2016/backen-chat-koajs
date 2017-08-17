const SocketIO = require('socket.io')

/**
 * Default Namespace: io || io.of('/') // public namespace
 * Auth Namespace: io.of('/auth') // protected namespace
 */
module.exports = (app, server) => {
  // Default Namespace
  const io = new SocketIO(server)

  io.on('connection', socket => {
    console.log('socket', socket.id)
  })

  // Auth Namespace
  const ioAuth = io.of('/auth')

  ioAuth.use((socket, next) => {
    // check JWT
    next()
  })

  ioAuth.on('connection', socket => {
    console.log('socket in ioAuth', socket.id)
  })

  app.context.io = io
  app.context.ioAuth = ioAuth
}
