const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const Users = require('./usersModel')

const Tokens = sequelize.define('Token', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4, allowNull: false, unique: true },
  hashedToken: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.UUID, allowNull: false },
  revoked: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
})

Tokens.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'CASCADE'
})

Users.hasMany(Tokens, {
  foreignKey: 'userId',
  as: 'tokens'
})

module.exports = Tokens
