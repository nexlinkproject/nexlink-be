const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const Users = require('./usersModel');
const Projects = require('./projectsModel');

const ProjectUser = sequelize.define('ProjectUser', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }
}, {
    tableName: 'ProjectUser',
    timestamps: true
});

ProjectUser.belongsTo(Users, { foreignKey: 'UserId', allowNull: false, onDelete: 'SET NULL', onUpdate: 'CASCADE' });
ProjectUser.belongsTo(Projects, { foreignKey: 'ProjectId', allowNull: false, onDelete: 'SET NULL', onUpdate: 'CASCADE' });

module.exports = ProjectUser;