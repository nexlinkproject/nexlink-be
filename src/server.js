const httpServer = require('./app')
const { connectDB, syncDatabase } = require('./models')
const loadConfig = require('../config')
const config = await loadConfig()
const { PORT } = config
const socketIO = require('socket.io')
const { socketHandlers } = require('./controllers/chatController')

const io = socketIO(httpServer)

socketHandlers(io)

async function startServer () {
  try {
    await connectDB()
    await syncDatabase()

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
