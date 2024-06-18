const { Sequelize } = require('sequelize')
const loadConfig = require('../config')
const config = await loadConfig()
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = config

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres'
})

const Users = require('./usersModel')
const Projects = require('./projectsModel')
const Tasks = require('./tasksModel')
const Chats = require('./chatsModel')
const Tokens = require('./tokensModel')
const ProjectsUsers = require('./projectsUsersModel')
const TasksUsers = require('./tasksUsersModel')
const ChatsUsers = require('./chatsUsersModel')

// Many-to-Many relationships through ProjectsUsers
Projects.belongsToMany(Users, {
  through: ProjectsUsers,
  foreignKey: 'projectId'
})
Users.belongsToMany(Projects, {
  through: ProjectsUsers,
  foreignKey: 'userId'
})

// Many-to-Many relationships through TasksUsers
Tasks.belongsToMany(Users, {
  through: TasksUsers,
  foreignKey: 'taskId'
})
Users.belongsToMany(Tasks, {
  through: TasksUsers,
  foreignKey: 'userId'
})

// Many-To-Many relationships through ChatsUsers
Chats.belongsToMany(Users, {
  through: ChatsUsers,
  foreignKey: 'chatId'
})
Users.belongsToMany(Chats, {
  through: ChatsUsers,
  foreignKey: 'userId'
})

// Self-referential relationship for group chats
Chats.hasMany(Chats, {
  foreignKey: 'groupId',
  as: 'groupMessages'
})
Chats.belongsTo(Chats, {
  foreignKey: 'groupId',
  as: 'parentGroup'
})

// One-to-Many relationships between Tokens and Users
Tokens.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
Users.hasMany(Tokens, {
  foreignKey: 'userId',
  as: 'tokens'
})

// One-to-Many relationships between Tasks and Projects
Projects.hasMany(Tasks, {
  foreignKey: 'projectId',
  as: 'tasks'
})
Tasks.belongsTo(Projects, {
  foreignKey: 'projectId',
  as: 'project'
})

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected...')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    return (error)
  }
}
const syncDatabase = async () => {
  try {
    // remove // for production
    await Users.sync()
    await Projects.sync()
    await Tasks.sync()
    await Tokens.sync()
    await ProjectsUsers.sync()
    await TasksUsers.sync()
    await Chats.sync()
    await ChatsUsers.sync()
    // await sequelize.authenticate()
    // await sequelize.sync()
    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.error('Error syncing database & tables:', error)
  }
}

module.exports = { connectDB, sequelize, Users, Projects, Tasks, Tokens, ProjectsUsers, TasksUsers, Chats, ChatsUsers, syncDatabase }
