const { ChatMessage } = require('../models/chat-message.model')
const { UserChat } = require('../models/user-chat.model')
const { User } = require('../models/user.model')

const emitChatMessageEvent = async (ctx, eventName, payload) => {
  const { chatId } = payload
  const userChats = await global.db.transaction(async t => {
    const queryOptions = { transaction: t }
    return UserChat.findAll({ where: { chatId }, include: [ User ] }, queryOptions)
  })
  for (let { user } of userChats) {
    const { sid } = user
    ctx.io.of('/chat').to(sid).emit(eventName, payload)
  }
}

exports.sendMessage = async ctx => {
  const user = ctx.state.currentUser
  const { id: userId } = user
  const { id: chatId } = ctx.params
  const { content, imageUrl, videoUrl } = ctx.request.body

  const chatMessage = await global.db.transaction(async t => {
    const queryOptions = { transaction: t }
    return ChatMessage.create({ content, imageUrl, videoUrl, chatId, userId }, queryOptions)
  })
  ctx.body = chatMessage
  await emitChatMessageEvent(ctx, 'SendMessage', chatMessage)
}

exports.editMessage = async ctx => {
  const { messageId: id, id: chatId } = ctx.params
  const { content, imageUrl, videoUrl } = ctx.request.body
  await global.db.transaction(async t => {
    const queryOptions = { transaction: t, where: { id, chatId }, returning: true }
    return ChatMessage.update({ content, imageUrl, videoUrl }, queryOptions)
  })
  ctx.body = { message: 'success', status: 200 }
  const { chatMessage } = ctx.state
  await emitChatMessageEvent(ctx, 'EditMessage', chatMessage)
}

exports.deleteMessage = async ctx => {
  const { messageId: id, id: chatId } = ctx.params
  await global.db.transaction(async t => {
    const queryOptions = { transaction: t }
    return ChatMessage.destroy({ where: { id, chatId } }, queryOptions)
  })
  ctx.body = { message: 'success', status: 200 }
  const { chatMessage } = ctx.state
  await emitChatMessageEvent(ctx, 'DeleteMessage', chatMessage)
}
