const { Projects, Users } = require('../models');

const findAllProjects = async () => {
  return Projects.findAll();
};

const findProjectById = async (id) => {
  return Projects.findByPk(id);
};

const createProject = async (projectData) => {
  return Projects.create(projectData);
};

const updateProject = async (id, projectData) => {
  return Projects.update(projectData, { where: { id } });
};

const deleteProject = async (id) => {
  return Projects.destroy({ where: { id } });
};

const findProjectUsers = async (id) => {
  return Projects.findByPk(id, { include: Users });
};

const addUserToProject = async (projectId, userId) => {
  const project = await Projects.findByPk(projectId);
  const user = await Users.findByPk(userId);
  if (project && user) {
    await project.addUser(user);
    return project;
  }
  throw new Error('Project or User not found');
};

const removeUserFromProject = async (projectId, userId) => {
  const project = await Projects.findByPk(projectId);
  const user = await Users.findByPk(userId);
  if (project && user) {
    await project.removeUser(user);
    return project;
  }
  throw new Error('Project or User not found');
};

module.exports = {
  findAllProjects,
  findProjectById,
  createProject,
  updateProject,
  deleteProject,
  findProjectUsers,
  addUserToProject,
  removeUserFromProject
};