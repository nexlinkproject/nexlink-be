const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const Users = require('./usersModel')

const Tokens = sequelize.define('Task', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4, allowNull: false, unique: true },
  hashedToken: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.STRING, allowNull: false },
  revoked: { type: DataTypes.DATE, allowNull: false },
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