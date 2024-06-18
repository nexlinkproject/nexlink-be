const httpServer = require('./app')
const { initializeDatabase, connectDB, syncDatabase } = require('./models')
const socketIO = require('socket.io')
const { socketHandlers } = require('./controllers/chatController')

const io = socketIO(httpServer)

socketHandlers(io)

async function startServer () {
  try {
    const { sequelize, ...models } = await initializeDatabase()
    await connectDB(sequelize)
    await syncDatabase(sequelize, models)

    const config = await require('./config')()
    const { PORT } = config

    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on: ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start the server:', error)
    process.exit(1)
  }
}

startServer()

module.exports = httpServer