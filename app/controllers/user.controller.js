const moment = require('moment')
const pug = require('pug')
const { User } = require('../models/user.model')
const { UserLoginCode } = require('../models/user-loging-code.model')
const { transport } = require('../../helpers/email')

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
