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
  name: { singular: 'chatRoom', plural: 'chatRooms' },
  tableName: 'chat_room',
  sequelize: global.db
}

class chatRoom extends Model {}

chatRoom.init(attributes, modelOptions)

exports.chatRoom = chatRoom

const { ChatMessage } = require('./chat-message.model')

chatRoom.hasMany(ChatMessage, {
  as: 'messages',
  foreignKey: { name: 'chatId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
})
