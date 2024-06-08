const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const Projects = require('./projectsModel');

const Tasks = sequelize.define('Task', {
  id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  deadline: { type: DataTypes.DATE, allowNull: true },
  projectId: { type: DataTypes.UUID, allowNull: true, references: { model: Projects, key: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
})

module.exports = Tasks
