const { Model, INTEGER } = require('sequelize')

const attributes = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  userId: {
    type: INTEGER,
    allowedNull: false
  },
  chatId: {
    type: INTEGER,
    allowedNull: false
  }
}

const modelOptions = {
  name: { singular: 'chatMemberGroup', plural: 'chatMemberGroups' },
  tableName: 'chat_member_group',
  sequelize: global.db
}

class ChatMemberGroup extends Model {}

ChatMemberGroup.init(attributes, modelOptions)

exports.ChatMemberGroup = ChatMemberGroup

const { User } = require('./user.model')
const { chatRoom } = require('./chat-room.model')

ChatMemberGroup.belongsTo(User, {
  as: 'user',
  foreignKey: { name: 'userId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
})

ChatMemberGroup.belongsTo(chatRoom, {
  as: 'chat_room',
  foreignKey: { name: 'chatId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
})
