const UserController = require('./controllers/user.controller')
const { validateEmail } = require('./middleware/user.middleware')
module.exports = [
  {
    prefix: '/v1/login',
    routes: [
      { method: 'POST', path: '/', middleware: [], handler: UserController.login },
      { method: 'POST', path: '/code', middleware: [ validateEmail ], handler: UserController.getLoginCode }
    ]
  },
  {
    prefix: '/v1/profiles',
    routes: [
       { method: 'GET', path: '/', middleware: [], handler: UserController.getUserProfile },
      { method: 'PUT', path: '/', middleware: [], handler: UserController.updateUserProfile }
    ]
  }
]
