require('dotenv').config()
const { loadSecrets } = require('../utils/secretManager')

module.exports = {
  PORT: process.env.PORT,
  GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: loadSecrets("be-api-sql-password"),
  DB_NAME: process.env.DB_NAME,
  JWT_ACCESS_SECRET: loadSecrets("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: loadSecrets("JWT_REFRESH_SECRET")
}
