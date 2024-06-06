const { Projects, Users, ProjectsUsers } = require('../models')

const findAllProjects = async () => {
  return Projects.findAll()
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
  return Projects.findByPk(id, { include: Users });
};

const isUserInProject = async (projectId, userId) => {
  const project = await Projects.findByPk(projectId, {
    include: {
      model: Users,
      where: { id: userId },
      required: false
    }
  });
  
  return project && project.Users.length > 0;
};

const addUserToProject = async (projectUserData) => {
  return ProjectsUsers.create(projectUserData)
}

const removeUserFromProject = async (projectId, userId) => {
  const project = await Projects.findByPk(projectId)
  const user = await Users.findByPk(userId)
  if (project && user) {
    await project.removeUser(user)
    return project
  }
  throw new Error('Project or User not found')
}

module.exports = {
  findAllProjects,
  findProjectById,
  createProject,
  updateProject,
  deleteProject,
  findProjectUsers,
  addUserToProject,
  removeUserFromProject,
  isUserInProject
}
