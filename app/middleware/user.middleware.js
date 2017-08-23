const { BadRequestError } = require('../../helpers/httpError')
const { User } = require('../models/user.model')
const { UserLoginCode } = require('../models/user-loging-code.model')
const moment = require('moment')

exports.validateEmail = async (ctx, next) => {
  const email = ctx.request.body.email
  if (!email) {
    throw new BadRequestError('Email is required!')
  }
  await next()
}

exports.validateLogin = async (ctx, next) => {
  const { email, code } = ctx.request.body

  if (!code) throw new BadRequestError('Code is required!')

  const user = (ctx.state.user = await User.find({ where: { email } }))
  if (!user) throw new BadRequestError('User was not found.')

  const loginCode = (ctx.state.loginCode = await UserLoginCode.find({ where: { code, userId: user.id } }))
  if (!loginCode) throw new BadRequestError('Invalid code')

  const expire = loginCode.expiredAt

  if (moment().isAfter(expire)) throw new BadRequestError('Code is expired!')
  await next()
}

exports.validateUser = async (ctx, next) => {
  const { currentUser } = ctx.state
  if (currentUser.id !== +ctx.params.id) throw new BadRequestError('Can not delete other user account.')
  await next()
}
