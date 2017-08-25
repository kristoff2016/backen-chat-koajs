const WelcomeController = require('./controllers/welcome.controller')
const UserController = require('./controllers/user.controller')
const ChatController = require('./controllers/chat.controller')
const ChatMessageController = require('./controllers/chat-message.controller')
const GeneralController = require('./controllers/upload.controller')
const { validateEmail, validateLogin, validateUser } = require('./middleware/user.middleware')
const { findChat } = require('./middleware/chat.middleware')
const { validateContent, validateChat, validateChatMessage } = require('./middleware/chat-message.middleware')
const { isMultiPart, singleUpload, singleVideoUpload } = require('./middleware/upload.middleware')

const { isAuthenticated } = require('./middleware/auth.middleware')
module.exports = [
  {
    prefix: '/',
    routes: [ { method: 'GET', path: '/', middleware: [], handler: WelcomeController.welcome } ]
  },
  {
    prefix: '/v1/chats',
    routes: [
      // list chat
      { method: 'GET', path: '/', middleware: [ isAuthenticated ], handler: ChatController.listChat },
      { method: 'GET', path: '/search', middleware: [ isAuthenticated ], handler: ChatController.search },
      { method: 'POST', path: '/', middleware: [ isAuthenticated ], handler: ChatController.createChat },
      {
        method: 'POST',
        path: '/:id/invites',
        middleware: [ isAuthenticated, findChat ],
        handler: ChatController.inviteUser
      },
      {
        method: 'POST',
        path: '/:id/kicks',
        middleware: [ isAuthenticated, findChat ],
        handler: ChatController.kickUser
      },
      {
        method: 'GET',
        path: '/:id/messages',
        middleware: [ isAuthenticated, validateChat ],
        handler: ChatController.getChatMessage
      },
      {
        method: 'GET',
        path: '/:id/users',
        middleware: [ isAuthenticated, validateChat ],
        handler: ChatController.getChatUser
      }
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
    prefix: '/v1/chats',
    routes: [
      {
        method: 'POST',
        path: '/:id/messages',
        middleware: [ isAuthenticated, validateContent, validateChat ],
        handler: ChatMessageController.sendMessage
      },
      {
        method: 'PUT',
        path: '/:id/message/:messageId',
        middleware: [ isAuthenticated, validateContent, validateChat, validateChatMessage ],
        handler: ChatMessageController.editMessage
      },
      {
        method: 'DELETE',
        path: '/:id/message/:messageId',
        middleware: [ isAuthenticated, validateChat, validateChatMessage ],
        handler: ChatMessageController.deleteMessage
      }
    ]
  },
  {
    prefix: '/v1/upload',
    routes: [
      {
        method: 'POST',
        path: '/images',
        middleware: [ singleUpload, isMultiPart ],
        handler: GeneralController.singleImageUploader
      },
      {
        method: 'POST',
        path: '/videos',
        middleware: [ singleVideoUpload, isMultiPart ],
        handler: GeneralController.singleVideoUploader
      }
    ]
  },
  {
    prefix: '/v1/login',
    routes: [
      { method: 'POST', path: '/', middleware: [ validateEmail, validateLogin ], handler: UserController.login },
      { method: 'POST', path: '/code', middleware: [ validateEmail ], handler: UserController.getLoginCode }
    ]
  },
  {
    prefix: '/v1/Users',
    routes: [
      { method: 'GET', path: '/', middleware: [ validateEmail, validateLogin ], handler: UserController.listUser }
    ]
  },
  {
    prefix: '/v1/profiles',
    routes: [
      { method: 'GET', path: '/', middleware: [ isAuthenticated ], handler: UserController.getUserProfile },
      { method: 'PUT', path: '/', middleware: [ isAuthenticated ], handler: UserController.updateUserProfile },
      {
        method: 'DELETE',
        path: '/:id',
        middleware: [ isAuthenticated, validateUser ],
        handler: UserController.deleteUserProfile
      }
    ]
  }
]
