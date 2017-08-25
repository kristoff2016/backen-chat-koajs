const _ = require('lodash')
const { User } = require('../models/user.model')
const { UserChat } = require('../models/user-chat.model')
const { Chat } = require('../models/chat.model')
const { ChatMessage } = require('../models/chat-message.model')

const emitChatUserEvent = async (ctx, eventName, payload) => {
  const { chatId, userId } = payload
  const userChats = await UserChat.findAll({ where: { chatId, userId }, include: [ User ] })
  for (let { user } of userChats) {
    const { sid } = user
    ctx.io.of('/chatuser').to(sid).emit(eventName, payload)
  }
}

exports.createChat = async ctx => {
  const { currentUser } = ctx.state
  const { userChatIds } = ctx.request.body
  const t = await global.db.transaction()

  try {
    const chat = await Chat.create({}, { transaction: t })
    const chatId = chat.id
    const userId = currentUser.id
    userChatIds.push(userId)
    const userchatsToBeCreated = userChatIds.map(userChatId => {
      return Object.assign({ userId: userChatId }, { chatId })
    })
    const userChats = await UserChat.bulkCreate(userchatsToBeCreated, { transaction: t })
    await t.commit()

    const result = {
      chat,
      userChats
    }
    ctx.status = 200
    ctx.body = result
    await emitChatUserEvent(ctx, 'createChat', result)
  } catch (error) {
    await t.rollback()
    throw error
  }
}

exports.inviteUser = async ctx => {
  const { id: chatId } = ctx.params
  const { userIds } = ctx.request.body // [1, 2]
  const { chat } = ctx.state

  const userChats = await UserChat.findAll({
    where: { chatId }
  })
  const invitedUsersIds = userChats.map(uc => uc.userId) // [2, 3]

  const uninvitedUserIds = _.difference(userIds, invitedUsersIds)

  const userChatsToBeCreated = uninvitedUserIds.map(u => ({
    userId: u,
    chatId
  }))

  let newUserChats
  await global.db.transaction(async t => {
    const queryOptions = { transaction: t }
    await UserChat.bulkCreate(userChatsToBeCreated, queryOptions)
    newUserChats = await UserChat.findAll({ where: { chatId }, ...queryOptions })
  })
  const result = {
    chat: chat.toJSON(),
    userChats: newUserChats
  }
  ctx.status = 200
  ctx.body = result
  await emitChatUserEvent(ctx, 'inviteUser', result)
}

exports.kickUser = async ctx => {
  const { id: chatId } = ctx.params
  const { userIds } = ctx.request.body // [1, 2]
  const { chat } = ctx.state

  const userChats = await UserChat.findAll({
    where: { chatId }
  })
  const usersChatIds = userChats.map(uc => uc.userId) // [2, 3]

  const kickedUserIds = _.intersection(userIds, usersChatIds)

  const userChatsToBeKick = kickedUserIds.map(u => u)

  let newUserChats

  await global.db.transaction(async t => {
    const queryOptions = { transaction: t }
    await UserChat.destroy({
      where: {
        userId: {
          $in: userChatsToBeKick
        },
        chatId
      },
      ...queryOptions
    })
    newUserChats = await UserChat.findAll({ where: { chatId }, ...queryOptions })
  })

  const result = {
    chat: chat.toJSON(),
    userChats: newUserChats
  }

  ctx.status = 200
  ctx.body = result

  await emitChatUserEvent(ctx, 'kickUser', result)
}

exports.listChat = async ctx => {
  /**
   * @param id { user id }
   */

  const { id } = ctx.state.currentUser
  const userChat = await UserChat.findAll({ where: { userId: id } })
  let chatIdList = userChat.map(userChat => userChat.chatId)
  let chatTitle = await Chat.findAll({ where: { id: { $in: chatIdList } } })
  const chatTitleStr = JSON.stringify(chatTitle)
  let chatTitleParse = JSON.parse(chatTitleStr)
  const chatMessage = await ChatMessage.findAll({
    where: { chatId: { $in: chatIdList } },
    group: [ [ 'chatId', 'DESC' ] ]
  })
  const chatMessageStr = JSON.stringify(chatMessage)
  let chatMessageParse = JSON.parse(chatMessageStr)
  for (let i in chatMessageParse) {
    for (let j in chatTitleParse) {
      if (chatMessageParse[i].chatId === chatTitleParse[j].id) {
        chatMessageParse[i].title = chatTitleParse[j].title
        chatMessageParse[i].profile = chatTitleParse[i].imageUrl
      }
    }
  }
  const userIds = chatMessageParse.map(chatMessageParse => chatMessageParse.userId)
  const userData = await User.findAll({
    where: { id: { $in: userIds } }
  })
  const userDataeStr = JSON.stringify(userData)
  const userDataParse = JSON.parse(userDataeStr)
  for (let i in userDataParse) {
    userDataParse[i].screenName = userDataParse[i].firstName + ' ' + userDataParse[i].lastName
    for (let j in userIds) {
      if (userDataParse[i].id === userIds[j]) {
        chatMessageParse[j].user = userDataParse[i]
      }
    }
  }
  ctx.body = { message: 'success', status: 200, data: chatMessageParse }
}
