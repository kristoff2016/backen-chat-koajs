const { Model, DataTypes: { INTEGER, STRING } } = require('sequelize')

const attributes = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  email: {
    type: STRING,
    allowedNull: false,
    unique: true
  },
  firstName: {
    type: STRING
  },
  lastName: {
    type: STRING
  },
  imageUrl: {
    type: STRING
  }
}
const modelOptions = {
  name: { singular: 'user', plural: 'users' },
  tableName: 'user',
  sequelize: global.db
}

class User extends Model {
  get id () {
    return this.getDataValue('id')
  }
}

User.init(attributes, modelOptions)

exports.User = User

const { UserLoginCode } = require('./user-loging-code.model')
const { ChatMessage } = require('./chat-message.model')

User.hasMany(UserLoginCode, {
  as: 'loginCodes',
  foreignKey: { name: 'userId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
})

User.hasMany(ChatMessage, {
  as: 'chatMessages',
  foreignKey: { name: 'userId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
})
