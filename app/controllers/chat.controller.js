const _ = require('lodash')
// const { User } = require('../models/user.model')
const { UserChat } = require('../models/user-chat.model')
const { Chat } = require('../models/chat.model')

// const { BadRequestError } = require('../../helpers/httpError')

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

    ctx.status = 200
    ctx.body = {
      chat,
      userChats
    }
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

  ctx.status = 200
  ctx.body = {
    chat: chat.toJSON(),
    userChats: newUserChats
  }
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

  ctx.status = 200
  ctx.body = {
    chat: chat.toJSON(),
    userChats: newUserChats
  }
}

exports.listChat = async ctx => {
  const { id: userId } = ctx.state.currentUser
  const userChats = await UserChat.findAll({ where: { userId }, include: [ Chat ] })
  let chatList = []
  for (const userChat of userChats) {
    chatList.push(userChat.chat)
  }
  ctx.body = { message: 'success', status: 200, chatList }
}
