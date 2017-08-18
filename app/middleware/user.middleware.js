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
  if (!code) throw new BadRequestError('Login code is required!')
  const user = await User.find({ where: { email } })
  const loginCode = await UserLoginCode.find({ where: { code, userId: user.id } })
  if (!loginCode) throw new BadRequestError('Incorrect login code')
  const now = moment().toISOString()
  const expire = loginCode.expiredAt
  if (moment(now).isAfter(expire)) throw new BadRequestError('Login code expired')
  await next()
}
