const taskService = require('../services/taskService')
const userService = require('../services/userService')
const { response } = require('../utils/middleware')
const { v4: uuidv4, validate: uuidValidate } = require('uuid')

const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.findAllTasks()
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
    if (!uuidValidate(req.params.id)) {
      return response(res, 404, `Task with ID: ${req.params.id} was not found`)
    }
    const task = await taskService.findTaskById(req.params.id)
    if (!task) {
      return response(res, 404, `Task with ID: ${req.params.id} was not found`)
    }
    response(res, 200, `${task.name} retrieved successfully`, { task })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const createTask = async (req, res, next) => {
  try {
    const taskData = { ...req.body, id: uuidv4() }
    const task = await taskService.createTask(taskData)
    response(res, 201, `${task.name} created successfully`, { task })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const updateTask = async (req, res, next) => {
  try {
    if (!uuidValidate(req.params.id)) {
      return response(res, 404, `Task with ID: ${req.params.id} not found`)
    }
    const [updated] = await taskService.updateTask(req.params.id, req.body)
    if (!updated) {
      return response(res, 404, `Task with ID: ${req.params.id} not found`)
    }
    const updatedTask = await taskService.findTaskById(req.params.id)
    response(res, 200, `${updatedTask.name} updated successfully`, { updatedTask })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const deleteTask = async (req, res, next) => {
  try {
    if (!uuidValidate(req.params.id)) {
      return response(res, 404, `Task with ID: ${req.params.id} not found`)
    }
    const task = await taskService.findTaskById(req.params.id)
    const deleted = await taskService.deleteTask(req.params.id)
    if (!deleted) {
      return response(res, 404, `Task with ID: ${req.params.id} not found`)
    }
    response(res, 200, `${task.name} deleted successfully`)
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const getProjectTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params
    if (!uuidValidate(projectId)) {
      return response(res, 404, `Project with ID: ${projectId} not found`)
    }
    const tasks = await taskService.findProjectTasks(projectId)
    if (!tasks) {
      return response(res, 404, `No tasks found for project with ID: ${req.params.projectId}`)
    }
    response(res, 200, 'Tasks retrieved successfully', { tasks })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const getUserTasks = async (req, res, next) => {
  try {
    const { userId } = req.params
    if (!uuidValidate(userId)) {
      return response(res, 404, `User with ID: ${userId} not found`)
    }
    const tasks = await taskService.findUserTasks(userId)
    if (!tasks || tasks.length === 0) {
      return response(res, 404, `No tasks found for user with ID: ${userId}`);
    }
    response(res, 200, 'Tasks retrieved successfully', { tasks })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const addUserToTask = async (req, res, next) => {
  try {
    const { taskId, userId } = req.params;
    if (!uuidValidate(taskId)) {
      return response(res, 404, `Task with ID: ${taskId} not found`)
    }
    if (!uuidValidate(userId)) {
      return response(res, 404, `User with ID: ${userId} not found`)
    }
    const task = await taskService.findTaskById(taskId)
    const user = await userService.findUserById(userId)
    if (!task) {
      return response(res, 404, `Task with ID: ${taskId} not found or not created`)
    }
    if (!user) {
      return response(res, 404, `User with ID: ${userId} not found or not registered`)
    }
    const isUserAdded = await taskService.isUserInTask(taskId, userId);
    if (isUserAdded) {
      return response(res, 400, `${user.fullName} is already added to the task`)
    }
    const TaskUserData = { taskId, userId, id: uuidv4() }
    const addTaskUser = await taskService.addUserToTask(TaskUserData)
    response(res, 200, 'User added to task successfully', { addTaskUser })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const removeUserFromTask = async (req, res, next) => {
  try {
    const { taskId, userId } = req.params
    if (!uuidValidate(taskId)) {
      return response(res, 404, `Task with ID: ${taskId} not found`)
    }
    if (!uuidValidate(userId)) {
      return response(res, 404, `User with ID: ${userId} not found`)
    }
    const user = await userService.findUserById(userId)
    const isUserAdded = await taskService.isUserInTask(taskId, userId);
    if (!isUserAdded) {
      return response(res, 404, `${user.fullName} not in this task`)
    }
    const task = await taskService.removeUserFromTask(taskId, userId)
    response(res, 200, 'User removed from task successfully', { task })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask, getProjectTasks, getUserTasks, addUserToTask, removeUserFromTask }
