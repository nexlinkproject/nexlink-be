const { Tasks, Users, Projects, TasksUsers } = require('../models')

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

const findTaskUsers = async (id) => {
  return Tasks.findByPk(id, { include: Users })
}

const findProjectTasks = async (projectId) => {
  return await Tasks.findAll({
    where: [
      {
        projectId
      }
    ],
    include: [
      {
        model: Users,
        attributes: ['id']
      },
      {
        model: Projects,
        attributes: ['deadline'],
        as: 'project'
      }
    ],
    attributes: ['id', 'name', 'description', 'status', 'startDate', 'endDate', 'priority', 'projectId']
  })
}

const findUserTasks = async (userId) => {
  return await Tasks.findAll({
    include: [
      {
        model: Users,
        through: { attributes: [] },
        where: { id: userId },
        attributes: []
      }
    ]
  })
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

module.exports = { findAllTasks, findTaskById, createTask, updateTask, deleteTask, findProjectTasks, findUserTasks, isUserInTask, addUserToTask, removeUserFromTask, findTaskUsers }
