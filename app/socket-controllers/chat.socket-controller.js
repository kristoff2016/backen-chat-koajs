const { SocketController } = require('socket.io-controllers')
const { User } = require('../models/user.model')

class ChatSocketController extends SocketController {
  async use () {
    const { socket, next } = this
    const { token: sid } = socket.handshake.query
    const user = await User.find({ where: { sid } })
    if (user) {
      socket.user = user
      return next()
    } else {
      return next(new Error('Could not authenticate.'))
    }
  }

  onConnection () {
    const { socket } = this
    const { user } = socket

    socket.join(user.sid)
  }

  onSend (payload) {
    console.log('user sent', payload)
  }
} // io.of('/chat')

exports.ChatSocketController = ChatSocketController
