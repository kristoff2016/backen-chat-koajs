const { Model, DataTypes: { INTEGER } } = require('sequelize')

const attributes = {
  userId: {
    primaryKey: true,
    type: INTEGER
  },
  chatId: {
    primaryKey: true,
    type: INTEGER
  }
}
const modelOptions = {
  name: { singular: 'userChat', plural: 'userChats' },
  tableName: 'user_chat',
  sequelize: global.db,
  timestamps: false
}

class UserChat extends Model {}

const { User } = require('./user.model')
const { Chat } = require('./chat.model')

UserChat.init(attributes, modelOptions)

exports.UserChat = UserChat

UserChat.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'cascade',
  onUpdate: 'cascade'
})

UserChat.belongsTo(Chat, {
  foreignKey: 'chatId',
  onDelete: 'cascade',
  onUpdate: 'cascade'
})
