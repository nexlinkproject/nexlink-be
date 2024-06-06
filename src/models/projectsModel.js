const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

const Projects = sequelize.define('Project', {
  id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATE, allowNull: true },
  endDate: { type: DataTypes.DATE, allowNull: true },
  deadline: { type: DataTypes.DATE, allowNull: true },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
})

module.exports = Projects
