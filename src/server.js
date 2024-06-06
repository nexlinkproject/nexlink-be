const httpServer = require('./app')
const { connectDB, syncDatabase } = require('./models')
const { PORT } = require('./config')
// Remove for using Secret Manager on Production
// const { loadSecrets } = require('./utils/secretManager');
// loadSecrets().then(() => {
  connectDB().then(syncDatabase().then(() => {
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on:${PORT}`)
  })
})).catch((error) => {
  console.error('Failed to start the server:', error)
})
// });

module.exports = httpServer
