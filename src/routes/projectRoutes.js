const express = require('express')
const router = express.Router()
const { getProjects, getProjectById, createProject, updateProject, deleteProject, getProjectUsers, addUserToProject, removeUserFromProject } = require('../controllers/projectController')

router.get('/', getProjects)
router.get('/:id', getProjectById)
router.post('/', createProject)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)
router.get('/:id/users', getProjectUsers)
router.post('/:projectId/users/:userId', addUserToProject)
router.delete('/:projectId/users/:userId', removeUserFromProject)

module.exports = router
