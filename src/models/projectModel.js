const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const User = require('./userModel');

const Project = sequelize.define('Project', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    deadline: { type: DataTypes.DATE, allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
});

Project.belongsToMany(User, { through: 'ProjectUser' });
User.belongsToMany(Project, { through: 'ProjectUser' });

module.exports = Project;
