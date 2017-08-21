const { SocketController } = require('socket.io-controllers')

class DefaultSocketController extends SocketController {
  onSendMessage (payload, fn) {}
}

exports.DefaultSocketController = DefaultSocketController
