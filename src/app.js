const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const cors = require('cors')
const http = require('http')

const bodyParser = require('body-parser')
const middlewares = require('./utils/middleware')

const app = express()
const httpServer = http.createServer(app)

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/projects', require('./routes/projectRoutes'))
app.use('/tasks', require('./routes/taskRoutes'))

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

module.exports = httpServer
