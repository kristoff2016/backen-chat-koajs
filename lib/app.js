const Koa = require('koa')
const cors = require('kcors')
const cloudinary = require('cloudinary')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const serve = require('koa-static')
const views = require('koa-views')
const path = require('path')
const { handleErrors } = require('./errorHandler')
const { setupRouter } = require('./router')

const app = new Koa()
const servePath = path.resolve('.', 'public')

app.use(handleErrors())
app.use(cors())
app.use(logger())
app.use(serve(servePath))
app.use(bodyparser())
app.use(
  views(path.resolve('.', 'app/views'), {
    extension: 'pug'
  })
)

setupRouter(app)

module.exports = app
