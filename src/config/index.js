require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  // for development
  // DB_PASSWORD: process.env.DB_PASSWORD,
  // JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  // JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET
}
