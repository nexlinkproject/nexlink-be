const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API Connected',
  });
});

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/projects', require('./projectRoutes'));
router.use('/tasks', require('./taskRoutes'));

module.exports = router;
