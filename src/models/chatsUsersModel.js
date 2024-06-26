const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const Chats = require('./chatsModel')
const Users = require('./usersModel')

const ChatsUsers = sequelize.define('ChatsUsers', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
  chatId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Chats,
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  }
})

module.exports = ChatsUsers
