const httpServer = require('./app')
const { connectDB } = require('./models')
const { PORT } = require('./config')
// Remove for using Secret Manager on Production
// const { loadSecrets } = require('./utils/secretManager');
// loadSecrets().then(() => {
connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}).catch((error) => {
  console.error('Failed to start the server:', error)
})
// });

module.exports = httpServer
