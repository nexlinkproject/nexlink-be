const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, createTask, updateTask, deleteTask, getProjectTasks, getUserTasks } = require('../controllers/taskController');

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/project/:projectId', getProjectTasks);
router.get('/user/:userId', getUserTasks);

module.exports = router;
