const { Sequelize } = require('sequelize')
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('../config')

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres'
})

const Users = require('./usersModel')
const Projects = require('./projectsModel')
const Tasks = require('./tasksModel')
const Tokens = require('./tokensModel')
const ProjectUser = require('./projectUsersModel')

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected...')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
const syncDatabase = async () => {
  try {
    await Users.sync()
    await Projects.sync()
    await Tasks.sync()
    await Tokens.sync()
    await ProjectUser.sync()
console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error syncing database & tables:', error);
  }
};

module.exports = { connectDB, sequelize, Users, Projects, Tasks, Tokens, syncDatabase }
