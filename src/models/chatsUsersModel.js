const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

const Chats = sequelize.define('Chat', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
})

module.exports = Chats
