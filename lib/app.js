const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const serve = require('koa-static')
const views = require('koa-views')
const path = require('path')

const app = new Koa()
const servePath = path.resolve('.', 'public')

app.use(logger())
app.use(serve(servePath))
app.use(bodyparser())
app.use(
  views(path.resolve(__dirname, './views'), {
    extension: 'pug'
  })
)

module.exports = app
