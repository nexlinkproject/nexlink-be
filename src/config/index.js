require('dotenv').config()
const { loadSecrets } = require('../utils/secretManager')

const loadConfig = async () => {
  // for secret manager
  const DB_PASSWORD = await loadSecrets("be-api-sql-password")
  const JWT_ACCESS_SECRET = await loadSecrets("JWT_ACCESS_SECRET")
  const JWT_REFRESH_SECRET = await loadSecrets("JWT_REFRESH_SECRET")

  return {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    
    // for development
    // DB_PASSWORD: process.env.DB_PASSWORD,
    // JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    // JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

    // for production
    DB_PASSWORD: DB_PASSWORD,
    JWT_ACCESS_SECRET: JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: JWT_REFRESH_SECRET
  }
}

module.exports = loadConfig