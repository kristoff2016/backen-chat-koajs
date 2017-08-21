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
      message: 'Please check your email. We sent you code!',
      status: 200
    }
  } catch (error) {
    await t.rollback()
    throw error
  }
}

exports.login = async ctx => {
  const { email, code } = ctx.request.body
  const token = await jwt.sign({ email, code }, config.jwt.secret, { expiresIn: '1 day' })
  ctx.body = {
    token: 'JWT ' + token,
    message: 'success',
    status: 200
  }
}

exports.getUserProfile = async ctx => {
  const { id: userId } = ctx.currentUser

  const user = await User.findOne({
    where: {
      id: userId
    }
  })

  if (!user) throw new BadRequestError('No User found')

  ctx.status = 200
  ctx.body = user
}

exports.updateUserProfile = async ctx => {
  const { id: userId } = ctx.currentUser
  const { firstName, lastName } = ctx.request.body
  const t = await global.db.transaction()

  try {
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    user.firstName = firstName
    user.lastName = lastName
    await user.save({ transaction: t })
    const newUser = await User.findOne({
      where: {
        id: userId
      },
      transaction: t
    })

    await t.commit()
    ctx.status = 200
    ctx.body = newUser
  } catch (error) {
    t.rollback()
    throw error
  }
}
