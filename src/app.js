const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const { syncDatabase } = require('./models')
const cors = require('cors')
const http = require('http')

const app = express()
const httpServer = http.createServer(app)

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

syncDatabase()

app.use('/', require('./routes/index'))

const middlewares = require('./utils/middleware')
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

module.exports = httpServer