require('dotenv').config()
const { loadSecrets } = require('../utils/secretManager')

module.exports = {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  
  // for development
  // DB_PASSWORD: process.env.DB_PASSWORD,
  // JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  // JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  //for production
  DB_PASSWORD: loadSecrets("be-api-sql-password"),
  JWT_ACCESS_SECRET: loadSecrets("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: loadSecrets("JWT_REFRESH_SECRET")
}
