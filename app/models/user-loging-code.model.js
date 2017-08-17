const { Model, INTEGER, STRING, DATE } = require('sequelize')

const attributes = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER
  },
  code: {
    type: STRING,
    allowedNull: false
  },
  expiredAt: {
    type: DATE,
    allowedNull: false
  }
}

const modelOptions = {
  name: { singular: 'userLoginCode', plural: 'userLoginCodes' },
  tableName: 'user_login_code',
  sequelize: global.db
}

class UserLoginCode extends Model {}

UserLoginCode.init(attributes, modelOptions)

exports.UserLoginCode = UserLoginCode

const { User } = require('./user.model')

UserLoginCode.belongsTo(User, {
  as: 'user',
  foreignKey: { name: 'userId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
})
