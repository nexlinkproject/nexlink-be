const { Task, Project, User } = require('../models');
const response = require('../utils/response');
const { Op } = require('sequelize');

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll();
        if (tasks.length === 0) {
            return response(res, 404, 'No tasks found');
        }
        response(res, 200, 'All tasks retrieved successfully', { tasks });
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return response(res, 404, `Task with ID: ${req.params.id} was not found`);
        }
        response(res, 200, `${task.title} retrieved successfully`, { task });
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

const createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        response(res, 201, `${task.title} created successfully`, { task });
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);
        const [updated] = await Task.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return response(res, 404, `Task with ID: ${req.params.id} not found`);
        }
        const updatedTask = await Task.findByPk(req.params.id);
        response(res, 200, `${task.title} updated successfully`, { updatedTask });
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);
        const deleted = await Task.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return response(res, 404, `Task with ID: ${req.params.id} not found`);
        }
        response(res, 200, `${task.title} deleted successfully`);
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

const getProjectTasks = async (req, res, next) => {
    try {
        const ProjectId = parseInt(req.params.projectId, 10);
        if (isNaN(ProjectId)) {
            return response(res, 400, 'Invalid projectId', { error: 'ProjectId must be a valid integer' });
        }
        
        const project = await Project.findByPk(ProjectId);
        if (!project) {
            return response(res, 404, `Project with ID: ${ProjectId} not found or not created`);
        }
        
        const tasks = await Task.findAll({ where: { ProjectId } });
        if (tasks.length === 0) {
            return response(res, 404, `No tasks found for ${project.name}`);
        }

        response(res, 200, `All task(s) on the ${project.name} retrieved successfully`, { tasks });
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

const getUserTasks = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            return response(res, 400, 'Invalid userId', { error: 'userId must be a valid integer' });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return response(res, 404, `User with ID: ${userId} not found or not created`);
        }
        const tasks = await Task.findAll({ where: { assignedTo: userId } });
        response(res, 200, `All task(s) for ${user.fullName} retrieved successfully`, { tasks });
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask, getProjectTasks, getUserTasks };
