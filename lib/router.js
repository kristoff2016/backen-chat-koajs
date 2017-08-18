/**
 * Module dependencies
 */
const Router = require('koa-router')

const appRoutes = require('../app/routes')

/**
 * Setup application routers according to the route definitions
 */
exports.setupRouter = app =>
  appRoutes.map(({ prefix, routes }) => {
    const router = new Router({ prefix })
    routes.map(({ method, path = '/', handler, middleware = [] }) => {
      if (!Array.isArray(middleware)) {
        throw new Error('Failed to setup router, middleware must be an array.')
      }
      router[method.toLowerCase()](path, ...middleware, handler)
    })
    app.use(router.routes()).use(router.allowedMethods())
  })
