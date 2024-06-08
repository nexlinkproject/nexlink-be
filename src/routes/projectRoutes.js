const express = require('express')
const router = express.Router()
const { authenticate } = require('../utils/middleware')
const { getProjects, getProjectById, createProject, updateProject, deleteProject, getProjectUsers, addUserToProject, removeUserFromProject } = require('../controllers/projectController')

router.get('/', authenticate, getProjects)
router.get('/:id', authenticate, getProjectById)
router.post('/', authenticate, createProject)
router.put('/:id', authenticate, updateProject)
router.delete('/:id', authenticate, deleteProject)
router.get('/:id/users', authenticate, getProjectUsers)
router.post('/:projectId/users/:userId', authenticate, addUserToProject)
router.delete('/:projectId/users/:userId', authenticate, removeUserFromProject)

module.exports = router
