const WelcomeController = require('./controllers/welcome.controller')
const UserController = require('./controllers/user.controller')
const ChatController = require('./controllers/chat.controller')
const { validateEmail, validateLogin } = require('./middleware/user.middleware')
const { isAuthenticated } = require('./middleware/auth.middleware')
module.exports = [
  {
    prefix: '/',
    routes: [ { method: 'GET', path: '/', middleware: [], handler: WelcomeController.welcome } ]
  },
  {
    prefix: '/v1/chats',
    routes: [
      { method: 'GET', path: '/', middleware: [], handler: UserController.listUser },
      { method: 'POST', path: '/', middleware: [ isAuthenticated ], handler: ChatController.createChat },
      { method: 'POST', path: '/:id/invites', middleware: [ isAuthenticated ], handler: ChatController.inviteUser },
      { method: 'POST', path: '/:id/kicks', middleware: [ isAuthenticated ], handler: ChatController.kickUser }
    ]
  },

  // create chat (w/ invited users[])
  // invite users <--
  // kick users -->

  // real-time ops
  // send/create chat message (API/ realtime)
  // edit
  // delete

  {
    prefix: '/v1/login',
    routes: [
      { method: 'POST', path: '/', middleware: [ validateEmail, validateLogin ], handler: UserController.login },
      { method: 'POST', path: '/code', middleware: [ validateEmail ], handler: UserController.getLoginCode }
    ]
  },
  {
    prefix: '/v1/profiles',
    routes: [
      { method: 'GET', path: '/', middleware: [ isAuthenticated ], handler: UserController.getUserProfile },
      { method: 'PUT', path: '/', middleware: [ isAuthenticated ], handler: UserController.updateUserProfile }
    ]
  }
]
