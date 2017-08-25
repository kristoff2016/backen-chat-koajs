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
    const chat = await Chat.create({ createdBy: currentUser.id }, { transaction: t })
    const chatId = chat.id
    const userId = currentUser.id
    userChatIds.push(userId)
    const userchatsToBeCreated = userChatIds.map(userChatId => {
      return Object.assign({ userId: userChatId }, { chatId })
    })
    const userChats = await UserChat.bulkCreate(userchatsToBeCreated, { transaction: t })
    await t.commit()
    const newUserId = userChats.map(uid => uid.userId)
    let newUser = await User.findAll({
      where: {
        id: {
          $in: newUserId
        }
      },
      transaction: t
    })
    const userStr = JSON.stringify(newUser)
    const userParse = JSON.parse(userStr)
    for (let i in userParse) {
      userParse[i].screenName = userParse[i].firstName + ' ' + userParse[i].lastName
      newUser = userParse[i]
    }

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

  let newUserChats, newUser
  await global.db.transaction(async t => {
    const queryOptions = { transaction: t }
    await UserChat.bulkCreate(userChatsToBeCreated, queryOptions)
    newUserChats = await UserChat.findAll({ where: { chatId }, ...queryOptions })
    const newUserId = newUserChats.map(uid => uid.userId)
    newUser = await User.findAll({
      where: {
        id: {
          $in: newUserId
        }
      },
      ...queryOptions
    })
    // const user = await User.findAll({where:  })
  })
  const userStr = JSON.stringify(newUser)
  const userParse = JSON.parse(userStr)
  for (let i in userParse) {
    userParse[i].screenName = userParse[i].firstName + ' ' + userParse[i].lastName
    newUser = userParse[i]
  }
  const result = {
    chat: chat.toJSON(),
    userChats: newUserChats,
    User: newUser
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

  let newUserChats, newUser
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
    const newUserId = newUserChats.map(uid => uid.userId)
    newUser = await User.findAll({
      where: {
        id: {
          $in: newUserId
        }
      },
      ...queryOptions
    })
  })
  const userStr = JSON.stringify(newUser)
  const userParse = JSON.parse(userStr)
  for (let i in userParse) {
    userParse[i].screenName = userParse[i].firstName + ' ' + userParse[i].lastName
    newUser = userParse[i]
  }
  const result = {
    chat: chat.toJSON(),
    userChats: newUserChats,
    User: newUser
  }

  ctx.status = 200
  ctx.body = result

  await emitChatUserEvent(ctx, 'kickUser', result)
}

exports.listChat = async ctx => {
  const { id } = ctx.state.currentUser
  const users = await User.find({
    where: { id },
    include: [ { model: Chat, as: 'chats' } ]
  })
  const chats = users.chats.map(chat => chat.get())
  let data = []
  for (let chat of chats) {
    const chatMessage = await ChatMessage.findAll({
      where: { chatId: chat.id },
      limit: 1,
      order: [ [ 'createdAt', 'DESC' ] ]
    })
    let content = ''
    if (chatMessage.length !== 0) {
      content = chatMessage[0].content
    }
    const { id, title, imageUrl, createdAt } = chat
    data.push({ id, title, imageUrl, createdAt, content })
  }
  ctx.body = { message: 'success', status: 200, data }
}
