const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const Users = require('./usersModel')
const Projects = require('./projectsModel')

const Tasks = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  ProjectId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Projects,
      key: 'id'
    }
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: 'id'
    }
  },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
})

module.exports = Tasks
