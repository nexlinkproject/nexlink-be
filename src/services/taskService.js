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

const findProjectTasks = async (projectId) => {
  return Tasks.findAll({ where: { projectId } })
}

const findUserTasks = async (userId) => {
  return TasksUsers.findAll({ where: { userId }, include: Tasks })
}

const isUserInTask = async (taskId, userId) => {
  const task = await Tasks.findByPk(taskId, {
    include: {
      model: Users,
      where: { id: userId },
      required: false
    }
  });
  
  return task && task.Users.length > 0;
};

const addUserToTask = async (taskUserData) => {
  return TasksUsers.create(taskUserData)
}

const removeUserFromTask = async (taskId, userId) => {
  const task = await Tasks.findByPk(taskId)
  const user = await Users.findByPk(userId)
  if (task && user) {
    await task.removeUser(user)
    return task
  }
  throw new Error('Task or User not found')
}

module.exports = { findAllTasks, findTaskById, createTask, updateTask, deleteTask, findProjectTasks, findUserTasks, isUserInTask, addUserToTask, removeUserFromTask }
