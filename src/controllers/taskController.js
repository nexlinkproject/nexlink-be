const taskService = require('../services/taskService');
const { response } = require('../utils/middleware');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.findAllTasks();
    if (tasks.length === 0) {
      return response(res, 404, 'No tasks found');
    }
    response(res, 200, 'All tasks retrieved successfully', { tasks });
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    if (!uuidValidate(req.params.id)) {
      return response(res, 404, `Task with ID: ${req.params.id} was not found`)
    }
    const task = await taskService.findTaskById(req.params.id);
    if (!task) {
      return response(res, 404, `Task with ID: ${req.params.id} was not found`);
    }
    response(res, 200, `${task.name} retrieved successfully`, { task });
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const taskData = { ...req.body, id: uuidv4() };
    const task = await taskService.createTask(taskData);
    response(res, 201, `${task.title} created successfully`, { task });
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    if (!uuidValidate(req.params.id)) {
      return response(res, 404, `Task with ID: ${req.params.id} not found`)
    }
    const [updated] = await taskService.updateTask(req.params.id, req.body);
    if (!updated) {
      return response(res, 404, `Task with ID: ${req.params.id} not found`);
    }
    const updatedTask = await taskService.findTaskById(req.params.id);
    response(res, 200, `${updatedTask.name} updated successfully`, { updatedTask });
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    if (!uuidValidate(req.params.id)) {
      return response(res, 404, `Task with ID: ${req.params.id} not found`)
    }
    const task = await taskService.findTaskById(req.params.id);
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) {
      return response(res, 404, `Task with ID: ${req.params.id} not found`);
    }
    response(res, 200, `${task.name} deleted successfully`);
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

const getProjectTasks = async (req, res, next) => {
  try {
    if (!uuidValidate(req.params.id)) {
      return response(res, 404, `No tasks found for project with ID: ${req.params.projectId}`)
    }
    const tasks = await taskService.findProjectTasks(req.params.projectId);
    if (!tasks) {
      return response(res, 404, `No tasks found for project with ID: ${req.params.projectId}`);
    }
    response(res, 200, 'Tasks retrieved successfully', { tasks });
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

const getUserTasks = async (req, res, next) => {
  try {
    if (!uuidValidate(req.params.id)) {
      return response(res, 404, `No tasks found for user with ID: ${req.params.userId}`)
    }
    const tasks = await taskService.findUserTasks(req.params.userId);
    if (!tasks) {
      return response(res, 404, `No tasks found for user with ID: ${req.params.userId}`);
    }
    response(res, 200, 'Tasks retrieved successfully', { tasks });
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message });
    console.log(error);
    next(error);
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask, getProjectTasks, getUserTasks };