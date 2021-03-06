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
  },
  chatId: {
    type: INTEGER,
    allowNull: false
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

ChatMessage.belongsTo(User, {
  as: 'user',
  foreignKey: { name: 'userId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
})
