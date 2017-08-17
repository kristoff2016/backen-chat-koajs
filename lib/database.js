const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize') // ORM
const { db: { uri } } = require('../config')

const sequelize = new Sequelize(uri, {
  dialect: 'mysql',
  define: {
    timestamps: true,
    paranoid: true
  }
})

global.db = sequelize

const modelsPath = path.resolve('.', 'app/models')
fs
  .readdirSync(modelsPath)
  .filter(model => model.indexOf('.model.js') > -1)
  .map(model => require(`${modelsPath}/${model}`))

module.exports = sequelize
