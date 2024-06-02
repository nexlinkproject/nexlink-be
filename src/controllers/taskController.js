const { Task } = require('../models');
const response = require('../utils/response');

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll();
        response(res, 200, 'Tasks retrieved successfully', { tasks });
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return response(res, 404, 'Task not found');
        }
        response(res, 200, 'Task retrieved successfully', { task });
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

const createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        response(res, 201, 'Task created successfully', { task });
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

const updateTask = async (req, res, next) => {
    try {
        const [updated] = await Task.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return response(res, 404, 'Task not found');
        }
        const updatedTask = await Task.findByPk(req.params.id);
        response(res, 200, 'Task updated successfully', { updatedTask });
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const deleted = await Task.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return response(res, 404, 'Task not found');
        }
        response(res, 200, 'Task deleted successfully');
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

const getProjectTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll({ where: { ProjectId: req.params.projectId } });
        response(res, 200, 'Project tasks retrieved successfully', { tasks });
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

const getUserTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll({ where: { UserId: req.params.userId } });
        response(res, 200, 'User tasks retrieved successfully', { tasks });
    } catch (error) {
        response(res, 500, 'Internal Server Error', { error: error.message });
    }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask, getProjectTasks, getUserTasks };
