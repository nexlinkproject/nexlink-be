const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

const Tokens = sequelize.define('Token', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4, allowNull: false, unique: true },
  hashedToken: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.UUID, allowNull: false },
  revoked: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
})

module.exports = Tokens
