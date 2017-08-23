const moment = require('moment')
const pug = require('pug')
const { User } = require('../models/user.model')
const { UserLoginCode } = require('../models/user-loging-code.model')
const { transport } = require('../../helpers/email')
const { BadRequestError } = require('../../helpers/httpError')
const jwt = require('../../helpers/jwt')
const config = require('../../config')
const uuidv4 = require('uuid/v4')

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

    await user.update({ sid: uuidv4() }, { transaction: t })

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
    message: 'success'
  }
  loginCode.expiredAt = moment().toISOString()
  await loginCode.save()
}

exports.getUserProfile = async ctx => {
  ctx.body = ctx.state.currentUser.toJSON()
}

exports.updateUserProfile = async ctx => {
  const { currentUser } = ctx.state
  const { firstName, lastName, imageUrl } = ctx.request.body

  if (!firstName && !lastName) {
    throw new BadRequestError('First name and last name are required.')
  }

  ctx.status = 200
  ctx.message = 'Your user profile have been updatad!'
  ctx.body = await global.db.transaction(async t => {
    const queryOptions = { transaction: t }
    currentUser.firstName = `${firstName}`.trim()
    currentUser.lastName = `${lastName}`.trim()
    currentUser.imageUrl = `${imageUrl}`.trim()

    await currentUser.save(queryOptions)
    await currentUser.reload(queryOptions)
    return currentUser.toJSON()
  })
}

exports.listUser = async ctx => {
  let limit = ctx.request.query.limit || 10
  let offset = ctx.request.query.offset || 0

  const users = await User.findAll({ limit: limit * 1, offset: offset * 1 })

  ctx.state = 200
  ctx.body = users
}

exports.deleteUserProfile = async ctx => {
  const { currentUser } = ctx.state
  const { id } = currentUser
  await global.db.transaction(async t => {
    const queryOptions = { transaction: t }
    return User.destroy({ where: { id }, ...queryOptions })
  })
  ctx.body = { message: 'success', status: 200 }
}
