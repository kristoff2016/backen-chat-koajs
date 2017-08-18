const { BadRequestError } = require('../../helpers/httpError')
exports.validateEmail = async (ctx, next) => {
  const email = ctx.request.body.email
  if (!email) {
    throw new BadRequestError('Email is required!')
  }
  await next()
}
