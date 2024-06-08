const httpServer = require('./app')
const { connectDB, syncDatabase } = require('./models')
const { PORT } = require('./config')

async function startServer () {
  try {
    // // Remove for using Secret Manager on Production
    // const { loadSecrets } = require('./utils/secretManager')
    // await loadSecrets();

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
