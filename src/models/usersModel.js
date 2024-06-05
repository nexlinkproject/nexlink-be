const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

const Users = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, primaryKey: true, allowNull: false, unique: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE },
  resetPasswordToken: { type: DataTypes.STRING },
  resetPasswordExpires: { type: DataTypes.DATE }
})

module.exports = Users
