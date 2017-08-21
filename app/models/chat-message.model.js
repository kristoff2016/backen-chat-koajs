/// <reference path="../../typings/modules/sequelize/index.d.ts" />
const { Model, INTEGER, STRING } = require('sequelize')

const attributes = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  content: {
    type: STRING,
    allowNull: false
  },
  imageUrl: {
    type: STRING,
    allowNull: true
  },
  videoUrl: {
    type: STRING,
    allowNull: true
  }
}
const modelOptions = {
  name: { singular: 'chatMessage', plural: 'chatMessages' },
  tableName: 'chat_message',
  sequelize: global.db
}

class ChatMessage extends Model {}

ChatMessage.init(attributes, modelOptions)

exports.ChatMessage = ChatMessage

const { User } = require('./user.model')
const { chatRoom } = require('./chat-room.model')

ChatMessage.belongsTo(chatRoom, {
  as: 'chat_room',
  foreignKey: { name: 'chatId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
})

ChatMessage.belongsTo(User, {
  as: 'user',
  foreignKey: { name: 'userId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
})
