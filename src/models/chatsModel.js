const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

const Chats = sequelize.define('Chat', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  chatType: { type: DataTypes.ENUM('GROUP', 'PRIVATE'), allowNull: false },
  groupId: { type: DataTypes.INTEGER, allowNull: true },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
})

module.exports = Chats
