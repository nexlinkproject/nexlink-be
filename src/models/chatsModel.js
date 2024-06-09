const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

const Chats = sequelize.define('Chat', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  chatType: {
    type: DataTypes.ENUM('GROUP', 'PRIVATE'),
    allowNull: false
  },
  groupId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Chats',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Chats'
})

module.exports = Chats
