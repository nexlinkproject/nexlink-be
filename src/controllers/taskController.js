const { Tasks, Projects, Users } = require('../models')
const { response } = require('../utils/middleware')

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Tasks.findAll()
    if (tasks.length === 0) {
      return response(res, 404, 'No tasks found')
    }
    response(res, 200, 'All tasks retrieved successfully', { tasks })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const getTaskById = async (req, res, next) => {
  try {
    const task = await Tasks.findByPk(req.params.id)
    if (!task) {
      return response(res, 404, `Tasks with ID: ${req.params.id} was not found`)
    }
    response(res, 200, `${task.title} retrieved successfully`, { task })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const createTask = async (req, res, next) => {
  try {
    const task = await Tasks.create(req.body)
    response(res, 201, `${task.title} created successfully`, { task })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const updateTask = async (req, res, next) => {
  try {
    const task = await Tasks.findByPk(req.params.id)
    const [updated] = await Tasks.update(req.body, { where: { id: req.params.id } })
    if (!updated) {
      return response(res, 404, `Tasks with ID: ${req.params.id} not found`)
    }
    const updatedTask = await Tasks.findByPk(req.params.id)
    response(res, 200, `${task.title} updated successfully`, { updatedTask })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const task = await Tasks.findByPk(req.params.id)
    const deleted = await Tasks.destroy({ where: { id: req.params.id } })
    if (!deleted) {
      return response(res, 404, `Tasks with ID: ${req.params.id} not found`)
    }
    response(res, 200, `${task.title} deleted successfully`)
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const getProjectTasks = async (req, res, next) => {
  try {
    const ProjectId = parseInt(req.params.projectId, 10)
    if (isNaN(ProjectId)) {
      return response(res, 400, 'Invalid projectId', { error: 'ProjectId must be a valid integer' })
    }

    const project = await Projects.findByPk(ProjectId)
    if (!project) {
      return response(res, 404, `Projects with ID: ${ProjectId} not found or not created`)
    }

    const tasks = await Tasks.findAll({ where: { ProjectId } })
    if (tasks.length === 0) {
      return response(res, 404, `No tasks found for ${project.name}`)
    }

    response(res, 200, `All task(s) on the ${project.name} retrieved successfully`, { tasks })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const getUserTasks = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10)
    if (isNaN(userId)) {
      return response(res, 400, 'Invalid userId', { error: 'userId must be a valid integer' })
    }
    const user = await Users.findByPk(userId)
    if (!user) {
      return response(res, 404, `Users with ID: ${userId} not found or not created`)
    }
    const tasks = await Tasks.findAll({ where: { assignedTo: userId } })
    response(res, 200, `All task(s) for ${user.fullName} retrieved successfully`, { tasks })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask, getProjectTasks, getUserTasks }
