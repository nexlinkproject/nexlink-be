const { Sequelize } = require('sequelize')
const loadConfig = require('../config')

let sequelize

const initializeDatabase = async () => {
  const config = await loadConfig()
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = config

  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres'
  })

  const Users = require('./usersModel')(sequelize)
  const Projects = require('./projectsModel')(sequelize)
  const Tasks = require('./tasksModel')(sequelize)
  const Chats = require('./chatsModel')(sequelize)
  const Tokens = require('./tokensModel')(sequelize)
  const ProjectsUsers = require('./projectsUsersModel')(sequelize)
  const TasksUsers = require('./tasksUsersModel')(sequelize)
  const ChatsUsers = require('./chatsUsersModel')(sequelize)

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

  return {
    sequelize,
    Users,
    Projects,
    Tasks,
    Tokens,
    ProjectsUsers,
    TasksUsers,
    Chats,
    ChatsUsers
  }
}

const connectDB = async (sequelize) => {
  try {
    await sequelize.authenticate()
    console.log('Database connected...')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    return error
  }
}

const syncDatabase = async (sequelize, models) => {
  try {
    // remove // for production
    await models.Users.sync()
    await models.Projects.sync()
    await models.Tasks.sync()
    await models.Tokens.sync()
    await models.ProjectsUsers.sync()
    await models.TasksUsers.sync()
    await models.Chats.sync()
    await models.ChatsUsers.sync()
    // await sequelize.authenticate()
    // await sequelize.sync()
    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.error('Error syncing database & tables:', error)
  }
}

module.exports = { initializeDatabase, connectDB, syncDatabase }