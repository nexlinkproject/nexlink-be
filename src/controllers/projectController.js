const { v4: uuidv4, validate: uuidValidate } = require('uuid')
const projectService = require('../services/projectService')
const userService = require('../services/userService')
const { response } = require('../utils/middleware')

const getProjects = async (req, res, next) => {
  try {
    const { startDate, endDate, status } = req.query

    let projects

    if (startDate && endDate && status) {
      // Ambil semua data projects berdasarkan startDate, endDate dan status
      projects = await projectService.findProjectsByDateRangeAndStatus(startDate, endDate, status)
    } else if (startDate && endDate) {
      // Ambil semua data projects berdasarkan startDate dan endDate
      projects = await projectService.findProjectsByDateRange(startDate, endDate)
    } else if (status) {
      // Ambil semua data projects berdasarkan status
      projects = await projectService.findProjectsByStatus(status)
    } else {
      // Ambil semua data projects
      projects = await projectService.findAllProjects()
    }

    if (projects.length === 0) {
      return response(res, 404, 'No Project found')
    }

    response(res, 200, 'Projects retrieved successfully', { projects })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const getProjectById = async (req, res, next) => {
  try {
    const projectId = req.params.id
    if (!uuidValidate(projectId)) {
      return response(res, 404, `Project with ID: ${projectId} not found`)
    }
    const project = await projectService.findProjectById(projectId)
    if (!project) {
      return response(res, 404, `Project with ID: ${projectId} not found`)
    }
    response(res, 200, `${project.name} retrieved successfully`, { project })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const createProject = async (req, res, next) => {
  try {
    const projectData = { ...req.body, id: uuidv4() }
    const project = await projectService.createProject(projectData)
    response(res, 201, `${project.name} created successfully`, { project })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const updateProject = async (req, res, next) => {
  try {
    const projectId = req.params.id
    if (!uuidValidate(projectId)) {
      return response(res, 404, `Project with ID: ${projectId} not found`)
    }
    const [updated] = await projectService.updateProject(projectId, req.body)
    if (!updated) {
      return response(res, 404, `Projects with ID: ${projectId} not found`)
    }
    const updatedProject = await projectService.findProjectById(projectId)
    response(res, 200, `${updatedProject.name} updated successfully`, { updatedProject })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const deleteProject = async (req, res, next) => {
  try {
    const projectId = req.params.id
    if (!uuidValidate(projectId)) {
      return response(res, 404, `Project with ID: ${projectId} not found`)
    }
    const project = await projectService.findProjectById(projectId)
    const deleted = await projectService.deleteProject(projectId)
    if (!deleted) {
      return response(res, 404, `Project with ID: ${projectId} not found`)
    }
    response(res, 200, `${project.name} deleted successfully`)
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const getProjectUsers = async (req, res, next) => {
  try {
    const projectId = req.params.id
    if (!uuidValidate(projectId)) {
      return response(res, 404, `Project with ID: ${projectId} not found`)
    }
    const project = await projectService.findProjectUsers(projectId)
    if (!project) {
      return response(res, 404, `Project with ID: ${projectId} was not found`)
    }
    if (!project.Users || project.Users.length === 0) {
      return response(res, 404, `No users found for ${project.name}`)
    }
    response(res, 200, 'Project retrieved successfully', { project })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const getUserProjects = async (req, res, next) => {
  try {
    const { userId } = req.params
    if (!uuidValidate(userId)) {
      return response(res, 404, `User with ID: ${userId} not found`)
    }

    const { date , status } = req.query

    let projects

    if (date && status) {
      projects = await projectService.findUserProjectsByDateAndStatus(userId, date, status)
    } else if (date) {
      projects = await projectService.findUserProjectsByDate(userId, date)
    } else if (status) {
      projects = await projectService.findUserProjectsByStatus(userId, status)
    } else {
      projects = await projectService.findUserProjects(userId)
    }

    if (!projects || projects.length === 0) {
      return response(res, 404, `No projects found for user with ID: ${userId}`)
    }
    response(res, 200, 'Projects retrieved successfully', { projects })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const addUserToProject = async (req, res, next) => {
  try {
    const { projectId, userId } = req.params
    if (!uuidValidate(projectId)) {
      return response(res, 404, `Project with ID: ${projectId} not found`)
    }
    if (!uuidValidate(userId)) {
      return response(res, 404, `User with ID: ${userId} not found`)
    }
    const project = await projectService.findProjectById(projectId)
    const user = await userService.findUserById(userId)
    if (!project) {
      return response(res, 404, `Project with ID: ${projectId} not found or not created`)
    }
    if (!user) {
      return response(res, 404, `User with ID: ${userId} not found or not registered`)
    }
    const isUserAdded = await projectService.isUserInProject(projectId, userId)
    if (isUserAdded) {
      return response(res, 400, `${user.fullName} is already added to the project`)
    }
    const ProjectUserData = { projectId, userId, id: uuidv4() }
    const addProjectUser = await projectService.addUserToProject(ProjectUserData)
    response(res, 200, 'User added to project successfully', { addProjectUser })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const removeUserFromProject = async (req, res, next) => {
  try {
    const { projectId, userId } = req.params
    if (!uuidValidate(projectId)) {
      return response(res, 404, `Project with ID: ${projectId} not found`)
    }
    if (!uuidValidate(userId)) {
      return response(res, 404, `User with ID: ${userId} not found`)
    }
    const user = await userService.findUserById(userId)
    const isUserAdded = await projectService.isUserInProject(projectId, userId)
    if (!isUserAdded) {
      return response(res, 404, `${user.fullName} not in this project`)
    }
    const project = await projectService.removeUserFromProject(projectId, userId)
    response(res, 200, 'User removed from project successfully', { project })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectUsers,
  addUserToProject,
  removeUserFromProject,
  getUserProjects
}
