const moment = require('moment')
const pug = require('pug')
const { User } = require('../models/user.model')
const { UserLoginCode } = require('../models/user-loging-code.model')
const { transport } = require('../../helpers/email')
const { BadRequestError } = require('../../helpers/httpError')
const jwt = require('../../helpers/jwt')
const config = require('../../config')

exports.getLoginCode = async ctx => {
  const { email } = ctx.request.body
  const t = await global.db.transaction()
  const code = Math.floor(100000 + Math.random() * 900000)
  try {
    const [ user ] = await User.findOrCreate({
      where: { email },
      defaults: { email },
      transaction: t
    })
    await UserLoginCode.create(
      {
        code,
        expiredAt: moment().add('5', 'minutes').toISOString(),
        userId: user.id
      },
      { transaction: t }
    )
    await t.commit()
    // send code verify account
    const compileFunc = pug.compileFile('app/views/template/email.pug')
    const html = compileFunc({
      code
    })
    let message = {
      from: 'API League <brainmusic2017@gmail.com>',
      to: email,
      subject: 'Pathmazing Messenger',
      generateTextFromHTML: true,
      html
    }
    await transport.sendMail(message)
    ctx.body = {
      message: 'We sent you an email. Please check your email',
      status: 200
    }
  } catch (error) {
    await t.rollback()
    throw error
  }
}

exports.login = async ctx => {
  const { user, loginCode } = ctx.state
  const userJSON = user.toJSON()
  delete userJSON.password
  const token = await jwt.sign(userJSON, config.jwt.secret, { expiresIn: '1 day' })
  ctx.body = {
    token: 'JWT ' + token,
    status: 200,
    message: 'message'
  }
  loginCode.expiredAt = moment().toISOString()
  await loginCode.save()
}

exports.getUserProfile = async ctx => {
  ctx.body = ctx.state.currentUser.toJSON()
}

exports.updateUserProfile = async ctx => {
  const { currentUser } = ctx.state
  const { firstName, lastName } = ctx.request.body

  if (!firstName && !lastName) {
    throw new BadRequestError('First name and last name are required.')
  }

  ctx.body = await global.db.transaction(async t => {
    const queryOptions = { transaction: t }
    currentUser.firstName = `${firstName}`.trim()
    currentUser.lastName = `${lastName}`.trim()

    await currentUser.save(queryOptions)
    await currentUser.reload(queryOptions)

    return currentUser.toJSON()
  })
}
