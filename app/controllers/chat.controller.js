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
  const { userIds, title, imageUrl } = ctx.request.body
  const t = await global.db.transaction()

  try {
    const chat = await Chat.create({ title, imageUrl, createdBy: currentUser.id }, { transaction: t })
    const chatId = chat.id
    const userId = currentUser.id
    userIds.push(userId)
    const userchatsToBeCreated = userIds.map(userChatId => {
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
      raw: true
    })

    for (let i in newUser) {
      newUser[i].screenName = newUser[i].firstName + ' ' + newUser[i].lastName
    }
    const result = {
      chat: chat.toJSON(),
      userChats: userChats,
      User: newUser
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
    await UserChat.bulkCreate({ userChatsToBeCreated, ...queryOptions })
    newUserChats = await UserChat.findAll({ where: { chatId }, ...queryOptions })
    const userChatIds = newUserChats.map(uid => uid.userId)
    newUser = await User.findAll({
      where: {
        id: {
          $in: userChatIds
        }
      },
      raw: true,
      ...queryOptions
    })
  })
  for (let i in newUser) {
    newUser[i].screenName = newUser[i].firstName + ' ' + newUser[i].lastName
    newUser = newUser[i]
  }
  const result = {
    chat: chat.toJSON(),
    UserChats: newUserChats,
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
    const userChatIds = newUserChats.map(uid => uid.userId)
    newUser = await User.findAll({
      where: {
        id: {
          $in: userChatIds
        }
      },
      raw: true,
      ...queryOptions
    })
  })

  for (let i in newUser) {
    newUser[i].screenName = newUser[i].firstName + ' ' + newUser[i].lastName
    newUser = newUser[i]
  }
  const result = {
    chat: chat.toJSON(),
    UserChats: newUserChats,
    User: newUser
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
  let chatTitle = await Chat.findAll({ where: { id: { $in: chatIdList } }, raw: true })
  const chatMessage = await ChatMessage.findAll({
    where: { chatId: { $in: chatIdList } },
    group: [ [ 'chatId', 'DESC' ] ],
    raw: true
  })
  for (let i in chatMessage) {
    for (let j in chatTitle) {
      if (chatMessage[i].chatId === chatTitle[j].id) {
        chatMessage[i].title = chatTitle[j].title
        chatMessage[i].profile = chatTitle[j].imageUrl
      }
    }
  }
  const userIds = chatMessage.map(chatMessage => chatMessage.userId)
  const userData = await User.findAll({
    where: { id: { $in: userIds } },
    raw: true
  })

  for (let i in userData) {
    userData[i].screenName = userData[i].firstName + ' ' + userData[i].lastName
    for (let j in userIds) {
      if (userData[i].id === userIds[j]) {
        chatMessage[j].user = userData[i]
      }
    }
  }
  ctx.body = { message: 'success', status: 200, data: chatMessage }
}
/**
 * Search user invite create new chat
 * 25 Aug, 2017 02: 03 PM
 * @author Kirstoff
 */

exports.search = async ctx => {
  const { q } = ctx.query
  // const { offsests, limits } = ctx.req.body
  const users = await User.findAll({
    where: { email: { $like: '%' + q + '%' }, id: { $notIn: [ ctx.state.currentUser.id ] } },
    raw: true
  })
  for (let i in users) {
    users[i].screenName = users[i].firstName + ' ' + users[i].lastName
  }
  ctx.body = { message: 'success', status: 200, data: users }
}

exports.getChatMessage = async ctx => {
  const { id: chatId } = ctx.params
  const limit = ctx.request.query.limit || 10
  let order = ctx.request.query.order || '-createdAt'
  let offset = ctx.request.query.offset || 0

  if (order.startsWith('-')) {
    order = [ order.replace('-', ''), 'DESC' ]
  } else {
    order = [ order ]
  }

  const chatMessages = await ChatMessage.findAll({
    where: { chatId },
    limit: +limit,
    offset: offset * 1,
    order: [ order ],
    include: [ { model: User, as: 'user' } ]
  })

  const data = chatMessages.map(chatMessage => {
    const { id, content, imageUrl, videoUrl, createdAt } = chatMessage
    const { firstName, lastName, imageUrl: userImageUrl } = chatMessage.user
    const fullName = `${firstName} ${lastName}`
    return { id, content, imageUrl, videoUrl, createdAt, fullName, userImageUrl }
  })

  ctx.body = { message: 'success', status: 200, data }
}

exports.getChatUser = async ctx => {
  const { id: chatId } = ctx.params
  const limit = ctx.request.query.limit || 10
  let order = ctx.request.query.order || 'id'
  let offset = ctx.request.query.offset || 0

  if (order.startsWith('-')) {
    order = [ order.replace('-', ''), 'DESC' ]
  } else {
    order = [ order ]
  }
  const userChats = await UserChat.findAll({
    where: { chatId }
  })
  const userIds = userChats.map(user => user.userId)

  let users = await User.findAll({ where: { id: userIds }, limit: +limit, order: [ order ], offset: offset * 1 })

  const data = users.map(user => {
    const admin = user.id === ctx.state.chat.createdBy
    const { id, firstName, lastName, imageUrl } = user
    const fullName = `${firstName} ${lastName}`
    return { id, fullName, imageUrl, admin }
  })

  ctx.body = { message: 'success', status: 200, data }
}
