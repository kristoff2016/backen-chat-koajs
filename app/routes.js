const WelcomeController = require('./controllers/welcome.controller')
const UserController = require('./controllers/user.controller')
const GeneralController = require('./controllers/upload.controller')
const { validateEmail, validateLogin } = require('./middleware/user.middleware')
const { isMultiPart, singleUpload, singleVideoUpload } = require('./middleware/upload.middleware')

const { isAuthenticated } = require('./middleware/auth.middleware')
module.exports = [
  {
    prefix: '/',
    routes: [ { method: 'GET', path: '/', middleware: [], handler: WelcomeController.welcome } ]
  },
  // {
  //   prefix: '/v1/chats',
  //   routes: [ {  } ]
  // },

  // list users[] (limit/ offset)
  // create chat (w/ invited users[])
  // invite users <--
  // kick users -->

  // real-time ops
  // send/create chat message (API/ realtime)
  // edit
  // delete

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
    prefix: '/v1/profiles',
    routes: [
      { method: 'GET', path: '/', middleware: [ isAuthenticated ], handler: UserController.getUserProfile },
      { method: 'PUT', path: '/', middleware: [ isAuthenticated ], handler: UserController.updateUserProfile }
    ]
  }
]
