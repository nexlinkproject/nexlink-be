const { Project, User } = require('../models')
const { response } = require('../utils/middleware')

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll()
    if (projects.length === 0) {
      return response(res, 404, 'No Project found')
    }
    response(res, 200, 'All projects retrieved successfully', { projects })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id)
    if (!project) {
      return response(res, 404, `Project with ID: ${req.params.id} was not found`)
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
    const project = await Project.create(req.body)
    response(res, 201, `${project.name} created successfully`, { project })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id)
    const [updated] = await Project.update(req.body, { where: { id: req.params.id } })
    if (!updated) {
      return response(res, 404, `Project with ID: ${req.params.id} not found`)
    }
    const updatedProject = await Project.findByPk(req.params.id)
    response(res, 200, `${project.name} updated successfully`, { updatedProject })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id)
    const deleted = await Project.destroy({ where: { id: req.params.id } })
    if (!deleted) {
      return response(res, 404, `Project with ID: ${req.params.id} not found`)
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
    const project = await Project.findByPk(req.params.id, { include: User })
    if (!project) {
      return response(res, 404, `Project with ID: ${req.params.id} not found or not created`)
    }
    if (!project.Users || project.Users.length === 0) {
      return response(res, 404, `No users found for ${project.name}`)
    }
    response(res, 200, 'Project users retrieved successfully', { users: project.Users })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const addUserToProject = async (req, res, next) => {
  try {
    const projectId = req.params.id
    const userId = req.body.userId

    const project = await Project.findByPk(projectId)
    const user = await User.findByPk(userId)

    if (!project) {
      return response(res, 404, `Project with ID: ${projectId} not found or not created`)
    }

    if (!user) {
      return response(res, 404, `User with ID: ${userId} not found or not registered`)
    }

    const isUserAdded = await project.hasUser(user)
    if (isUserAdded) {
      return response(res, 400, `${user.fullName} is already added to the project`)
    }

    await project.addUser(user)
    response(res, 200, `${user.fullName} added to ${project.name}`)
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const removeUserFromProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id)
    const user = await User.findByPk(req.params.userId)

    if (!project) {
      return response(res, 404, `Project with ID: ${req.params.id} not found or not created`)
    }

    if (!user) {
      return response(res, 404, `User with ID: ${req.params.userId} not found or not registered ${user}`)
    }

    const isUserExist = await project.hasUser(user)
    if (!isUserExist) {
      return response(res, 400, `${user.fullName} not in the project`)
    }

    await project.removeUser(user)
    response(res, 200, `${user.fullName} successfully removed from project`)
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject, getProjectUsers, addUserToProject, removeUserFromProject }
