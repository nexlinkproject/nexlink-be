const express = require('express');
const bodyParser = require('body-parser');
const { errorHandler } = require('./utils/errorHandler');
const response = require('./utils/response');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/projects', require('./routes/projectRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));

// Error Handler
app.use(errorHandler);

module.exports = app;
