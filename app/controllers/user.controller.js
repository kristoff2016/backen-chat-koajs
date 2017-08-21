const moment = require('moment')
const pug = require('pug')
const { User } = require('../models/user.model')
const { UserLoginCode } = require('../models/user-loging-code.model')
const { transport } = require('../../helpers/email')
const { BadRequestError } = require('../../helpers/httpError')

exports.getLoginCode = async ctx => {
  const { email } = ctx.request.body
  const t = await global.db.transaction()
  const code = Math.floor(10000000 + Math.random() * 90000000)
  try {
    const [ user ] = await User.findOrCreate({
      where: { email },
      defaults: { email },
      transaction: t
    })
    const loginCode = await UserLoginCode.create(
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
    ctx.body = { ...user.get(), loginCode: loginCode.toJSON() }
  } catch (error) {
    await t.rollback()
    throw error
  }
}

exports.login = async ctx => {}

exports.getUserProfile = async ctx => {
  const { userId } = ctx.request.body

  const user = await User.findById({
    where: {
      id: userId
    }
  })

  if (!user) throw new BadRequestError('No User found')

  ctx.status = 200
  ctx.body = user
}

exports.updateUserProfile = async ctx => {
  const { userId, firstName, lastName } = ctx.request.body
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
      }
    })

    await t.commit()
    ctx.status = 200
    ctx.body = newUser
  } catch (error) {
    t.rollback()
    throw error
  }
}
