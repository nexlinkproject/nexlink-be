const { Tasks, Users, TasksUsers } = require('../models')

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

// Using Tasks model for one to many
const findProjectTasks = async (projectId) => {
  return Tasks.findAll({ where: { projectId } })
}

// Using TasksUsers model for many to many
const findUserTasks = async (userId) => {
  return Tasks.findAll({ where: { userId }, include: Tasks })
}

const isUserInTask = async (taskId, userId) => {
  const task = await Tasks.findByPk(taskId, {
    include: {
      model: Users,
      where: { id: userId },
      required: false
    }
  })

  return task && task.Users.length > 0
}

const addUserToTask = async (taskUserData) => {
  return TasksUsers.create(taskUserData)
}

const removeUserFromTask = async (taskId, userId) => {
  const taskUser = await TasksUsers.findOne({ where: { taskId, userId } })
  if (taskUser) {
    return taskUser.destroy()
  }
  throw new Error('Task or User not found')
}

module.exports = { findAllTasks, findTaskById, createTask, updateTask, deleteTask, findProjectTasks, findUserTasks, isUserInTask, addUserToTask, removeUserFromTask }
