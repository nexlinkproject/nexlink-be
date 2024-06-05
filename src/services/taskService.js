const { Tasks } = require('../models')

const findAllTasks = async () => {
  return Tasks.findAll()
}

const findTaskById = async (id) => {
  return Tasks.findByPk(id)
}

const createTask = async (taskData) => {
  return Tasks.create(taskData)
}

const updateTask = async (id, taskData) => {
  return Tasks.update(taskData, { where: { id } })
}

const deleteTask = async (id) => {
  return Tasks.destroy({ where: { id } })
}

const findProjectTasks = async (projectId) => {
  return Tasks.findAll({ where: { ProjectId: projectId } })
}

const findUserTasks = async (userId) => {
  return Tasks.findAll({ where: { assignedTo: userId } })
}

module.exports = { findAllTasks, findTaskById, createTask, updateTask, deleteTask, findProjectTasks, findUserTasks }
