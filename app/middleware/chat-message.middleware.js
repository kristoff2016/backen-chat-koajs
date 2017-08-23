const { BadRequestError } = require('../../helpers/httpError')
const { ChatMessage } = require('../models/chat-message.model')
const { Chat } = require('../models/chat.model')

exports.validateChat = async (ctx, next) => {
  const { id } = ctx.params
  const chat = await Chat.find({ where: { id } })
  if (!chat) throw new BadRequestError('Chat not found!')
  await next()
}

exports.validateContent = async (ctx, next) => {
  const { content } = ctx.request.body
  if (!content) throw new BadRequestError('Content is required!')
  await next()
}
exports.validateChatMessage = async (ctx, next) => {
  const { messageId: id, id: chatId } = ctx.params
  const chatMessage = await ChatMessage.find({ where: { id, chatId } })
  if (!chatMessage) throw new BadRequestError('Chat message not found.')
  ctx.state.chatMessage = chatMessage
  await next()
}
