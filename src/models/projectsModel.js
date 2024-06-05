const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const Users = require('./usersModel')

const Projects = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  deadline: { type: DataTypes.DATE, allowNull: false },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
})

Projects.belongsToMany(Users, { through: 'ProjectUser' })
Users.belongsToMany(Projects, { through: 'ProjectUser' })

module.exports = Projects
