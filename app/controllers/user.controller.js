const moment = require('moment')

const { User } = require('../models/user.model')
const { UserLoginCode } = require('../models/user-loging-code.model')

exports.getLoginCode = async ctx => {
  const { email } = ctx.request.body

  const t = await ctx.db.transaction()

  try {
    const [ user ] = await User.findOrCreate({
      where: { email },
      defaults: { email },
      transaction: t
    })

    const loginCode = await UserLoginCode.create(
      {
        code: Math.random() * 100000,
        expiredAt: moment().add('5', 'minutes').toISOString(),
        userId: user.id
      },
      { transaction: t }
    )

    await t.commit()
    ctx.body = { ...user.get(), loginCode: loginCode.toJSON() }
  } catch (error) {
    await t.rollback()
    throw error
  }
}

exports.login = async ctx => {}
