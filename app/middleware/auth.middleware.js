const { User } = require('../models/user.model')
const jwt = require('jsonwebtoken')
const Promise = require('bluebird')
const config = require('../../config')
const { BadRequestError, UnauthorizedError } = require('../../helpers/httpError')

const jwtPromise = Promise.promisifyAll(jwt)

exports.isAuthenticated = async (ctx, next) => {
  const authorization = ctx.request.headers['authorization'] // JWT jwt-some-string
  if (!authorization) {
    throw new BadRequestError('Missing authorization header')
  }
  const [ type, token ] = authorization.split(/ /g) // destruturing array es6 jwtResult.email
  if (type !== 'JWT') throw new BadRequestError('Only JWT type allowed!')
  if (!token) throw new BadRequestError('Token missing!')
  // promise version
  let jwtResult
  try {
    jwtResult = await jwtPromise.verifyAsync(token, config.jwt.secret)
  } catch (error) {
    console.log(error)
    switch (error.name) {
      case 'JsonWebTokenError':
        throw new UnauthorizedError('Invalid access token.')
      case 'TokenExpiredError':
        throw new UnauthorizedError('Access token has expired.')
      case 'NotBeforeError':
        throw new UnauthorizedError('Not before error.')
      default:
        throw new UnauthorizedError('Something wrong with access token.')
    }
  }

  const user = await User.find({
    where: { email: jwtResult.email }
  })

  ctx.state.currentUser = user

  await next()
}
