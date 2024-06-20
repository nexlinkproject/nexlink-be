const { Tasks, Users, Projects, TasksUsers } = require('../models')
const { Op } = require('sequelize')

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

const findUserTasksByDateAndStatus = async (userId, date, status) => {
  try {
    console.log(`Finding tasks for user ${userId} on date ${date} with status ${status}`);

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      throw new Error('Invalid date format');
    }

    const tasks = await Tasks.findAll({
      include: [
        {
          model: Users,
          through: { attributes: [] },
          where: { id: userId },
          attributes: []
        }
      ],
      where: {
        startDate: { [Op.lte]: parsedDate },
        endDate: { [Op.gte]: parsedDate },
        status: status // tambahkan kondisi status
      }
    });

    console.log(`Tasks found: ${tasks.length}`);
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks by date and status:', error);
    throw new Error('Error while fetching tasks by date and status: ' + error.message);
  }
};

const findUserTasksByStatus = async (userId, status) => {
  return Tasks.findAll({
    include: [
      {
        model: Users,
        through: { attributes: [] },
        where: { id: userId },
        attributes: []
      }
    ],
    where: {
      status
    }
  })
}

const findUserTasksByDate = async (userId, date) => {
  try {
    console.log(`Finding tasks for user ${userId} on date ${date}`);

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      throw new Error('Invalid date format');
    }

    const tasks = await Tasks.findAll({
      include: [
        {
          model: Users,
          through: { attributes: [] },
          where: { id: userId },
          attributes: []
        }
      ],
      where: {
        startDate: { [Op.lte]: parsedDate },
        endDate: { [Op.gte]: parsedDate }
      }
    });

    console.log(`Tasks found: ${tasks.length}`);
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks by date:', error);
    throw new Error('Error while fetching tasks by date: ' + error.message);
  }
};

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

module.exports = { findAllTasks, findTaskById, createTask, updateTask, deleteTask, findProjectTasks, findUserTasks, findUserTasksByStatus, findUserTasksByDateAndStatus, findUserTasksByDate, isUserInTask, addUserToTask, removeUserFromTask, findTaskUsers }
