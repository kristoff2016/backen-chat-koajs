const UserController = require('./controllers/user.controller')

module.exports = [
  {
    prefix: '/v1/login',
    routes: [
      { method: 'POST', path: '/', middleware: [], handler: UserController.login },
      { method: 'POST', path: '/code', handler: UserController.getLoginCode }
    ]
  },
  {
    prefix: '/v1/profiles',
    routes: [
      { method: 'GET', path: '/', middleware: [], handler: () => {} },
      { method: 'PUT', path: '/', middleware: [], handler: () => {} }
    ]
  }
]
