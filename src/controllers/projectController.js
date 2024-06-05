const { v4: uuidv4, validate: uuidValidate } = require('uuid');
const projectService = require('../services/projectService');
const { response } = require('../utils/middleware');

const getProjects = async (req, res, next) => {
  try {
    const projects = await projectService.findAllProjects();
    if (projects.length === 0) {
      return response(res, 404, 'No Projects found');
    }
    response(res, 200, 'All projects retrieved successfully', { projects });
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    if (!uuidValidate(req.params.id)) {
      return response(res, 404, `Project with ID: ${req.params.id} not found`)
    }
    const project = await projectService.findProjectById(req.params.id);
    if (!project) {
      return response(res, 404, `Project with ID: ${req.params.id} not found`);
    }
    response(res, 200, `${project.name} retrieved successfully`, { project });
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const projectData = { ...req.body, id: uuidv4() };
    const project = await projectService.createProject(projectData);
    response(res, 201, `${project.name} created successfully`, { project });
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    if (!uuidValidate(req.params.id)) {
      return response(res, 404, `Project with ID: ${req.params.id} not found`)
    }
    const [updated] = await projectService.updateProject(req.params.id, req.body);
    if (!updated) {
      return response(res, 404, `Projects with ID: ${req.params.id} not found`);
    }
    const updatedProject = await projectService.findProjectById(req.params.id);
    response(res, 200, `${updatedProject.name} updated successfully`, { updatedProject });
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    if (!uuidValidate(req.params.id)) {
      return response(res, 404, `Project with ID: ${req.params.id} not found`)
    }
    const project = await projectService.findProjectById(req.params.id);
    const deleted = await projectService.deleteProject(req.params.id);
    if (!deleted) {
      return response(res, 404, `Project with ID: ${req.params.id} not found`);
    }
    response(res, 200, `${project.name} deleted successfully`);
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

const getProjectUsers = async (req, res, next) => {
  try {
    const project = await projectService.findProjectUsers(req.params.id);
    if (!project) {
      return response(res, 404, `Project with ID: ${req.params.id} was not found`);
    }
    response(res, 200, 'Projects retrieved successfully', { project });
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};
const addUserToProject = async (req, res, next) => {
  try {
    const { projectId, userId } = req.params;
    const project = await projectService.addUserToProject(projectId, userId);
    response(res, 200, 'User added to project successfully', { project });
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

const removeUserFromProject = async (req, res, next) => {
  try {
    const { projectId, userId } = req.params;
    const project = await projectService.removeUserFromProject(projectId, userId);
    response(res, 200, 'User removed from project successfully', { project });
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject, getProjectUsers, addUserToProject, removeUserFromProject };