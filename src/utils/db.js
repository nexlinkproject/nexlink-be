const { Sequelize } = require('sequelize')
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('../config')

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres'
})

module.exports = { sequelize }
