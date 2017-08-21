const { Model, DataTypes: { INTEGER, STRING } } = require('sequelize')

const attributes = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  title: {
    type: STRING,
    allowNull: false
  }
}
const modelOptions = {
  name: { singular: 'chat', plural: 'chats' },
  tableName: 'chat',
  sequelize: global.db
}

class Chat extends Model {}

Chat.init(attributes, modelOptions)

exports.Chat = Chat

const { ChatMessage } = require('./chat-message.model')
const { User } = require('./user.model')
const { UserChat } = require('./user-chat.model')

Chat.hasMany(ChatMessage, {
  as: 'messages',
  foreignKey: { name: 'chatId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
})

Chat.belongsToMany(User, { through: UserChat })
