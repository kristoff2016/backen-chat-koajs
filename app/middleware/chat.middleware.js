const { Chat } = require('../models/chat.model')
const { BadRequestError } = require('../../helpers/httpError')

exports.findChat = async (ctx, next) => {
  const { id: chatId } = ctx.params

  const chat = await Chat.findOne({
    where: {
      id: chatId
    }
  })

  if (!chat) throw new BadRequestError('Chat was not found')

  ctx.state.chat = chat
  await next()
}
