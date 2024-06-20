const { Projects, Users, ProjectsUsers } = require('../models')
const { Op } = require('sequelize')

const findAllProjects = async () => {
  return Projects.findAll()
}

const findProjectsByDateRange = async (startDate, endDate) => {
  return Projects.findAll({
    where: {
      startDate: {
        [Op.gte]: new Date(startDate) // Greater than or equal to startDate
      },
      endDate: {
        [Op.lte]: new Date(endDate) // Less than or equal to endDate
      }
    }
  })
}

const findProjectsByStatus = async (status) => {
  return Projects.findAll({
    where: {
      status
    }
  })
}

const findProjectsByDateRangeAndStatus = async (startDate, endDate, status) => {
  return Projects.findAll({
    where: {
      startDate: {
        [Op.gte]: new Date(startDate)
      },
      endDate: {
        [Op.lte]: new Date(endDate)
      },
      status
    }
  })
}

const findProjectById = async (id) => {
  return Projects.findByPk(id)
}

const createProject = async (projectData) => {
  return Projects.create(projectData)
}

const updateProject = async (id, projectData) => {
  return Projects.update(projectData, { where: { id } })
}

const deleteProject = async (id) => {
  return Projects.destroy({ where: { id } })
}

const findProjectUsers = async (id) => {
  return Projects.findByPk(id, { include: Users })
}

const findUserProjects = async (userId) => {
  return await Projects.findAll({
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

const findUserProjectsByDate = async (userId, date) => {
  try {
    console.log(`Finding projects for user ${userId} on date ${date}`);
    
    const projects = await Projects.findAll({
      include: [
        {
          model: Users,
          through: { attributes: [] },
          where: { id: userId },
          attributes: []
        }
      ],
      where: {
        startDate: { [Op.lte]: new Date(date) },
        endDate: { [Op.gte]: new Date(date) }
      }
    });
    
    console.log(`Projects found: ${projects.length}`);
    return projects;
  } catch (error) {
    console.error('Error fetching projects by date:', error);
    throw new Error('Error while fetching projects by date: ' + error.message);
  }
};


const findUserProjectsByStatus = async (userId, status) => {
  return Projects.findAll({
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

const findUserProjectsByDateAndStatus = async (userId, date, status) => {
  try {
    console.log(`Finding projects for user ${userId} on date ${date} with status ${status}`);
    
    const projects = await Projects.findAll({
      include: [
        {
          model: Users,
          through: { attributes: [] },
          where: { id: userId },
          attributes: []
        }
      ],
      where: {
        startDate: { [Op.lte]: new Date(date) },
        endDate: { [Op.gte]: new Date(date) },
        status: status 
      }
    });
    
    console.log(`Projects found: ${projects.length}`);
    return projects;
  } catch (error) {
    console.error('Error fetching projects by date and status:', error);
    throw new Error('Error while fetching projects by date and status: ' + error.message);
  }
};

const isUserInProject = async (projectId, userId) => {
  const project = await Projects.findByPk(projectId, {
    include: {
      model: Users,
      where: { id: userId },
      required: false
    }
  })

  return project && project.Users.length > 0
}

const addUserToProject = async (projectUserData) => {
  return ProjectsUsers.create(projectUserData)
}

const removeUserFromProject = async (projectId, userId) => {
  const projectUser = await ProjectsUsers.findOne({ where: { projectId, userId } })
  if (projectUser) {
    return projectUser.destroy()
  }
  throw new Error('Project or User not found')
}

module.exports = {
  findAllProjects,
  findProjectsByDateRange,
  findProjectsByStatus,
  findProjectsByDateRangeAndStatus,
  findProjectById,
  createProject,
  updateProject,
  deleteProject,
  findProjectUsers,
  addUserToProject,
  removeUserFromProject,
  isUserInProject,
  findUserProjects,
  findUserProjectsByDateAndStatus,
  findUserProjectsByDate,
  findUserProjectsByStatus
}
