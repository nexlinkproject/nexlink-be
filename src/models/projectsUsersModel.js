const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

const ProjectsUsers = sequelize.define('ProjectUser', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
})

module.exports = ProjectsUsers
