const { Project, User, Task } = require('../models');
const response = require('../utils/response');

const getProjects = async (req, res, next) => {
    try {
        const projects = await Project.findAll();
        response(res, 200, 'Projects retrieved successfully', { projects });
    } catch (error) {
        next(error);
    }
};

const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            return response(res, 404, 'Project not found');
        }
        response(res, 200, 'Project retrieved successfully', { project });
    } catch (error) {
        next(error);
    }
};

const createProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);
        response(res, 201, 'Project created successfully', { project });
    } catch (error) {
        next(error);
    }
};

const updateProject = async (req, res, next) => {
    try {
        const [updated] = await Project.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return response(res, 404, 'Project not found');
        }
        const updatedProject = await Project.findByPk(req.params.id);
        response(res, 200, 'Project updated successfully', { updatedProject });
    } catch (error) {
        next(error);
    }
};

const deleteProject = async (req, res, next) => {
    try {
        const deleted = await Project.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return response(res, 404, 'Project not found');
        }
        response(res, 200, 'Project deleted successfully');
    } catch (error) {
        next(error);
    }
};

const getProjectUsers = async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id, { include: User });
        if (!project) {
            return response(res, 404, 'Project not found');
        }
        response(res, 200, 'Project users retrieved successfully', { users: project.Users });
    } catch (error) {
        next(error);
    }
};

const addUserToProject = async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id);
        const user = await User.findByPk(req.body.userId);
        if (!project || !user) {
            return response(res, 404, 'Project or User not found');
        }
        await project.addUser(user);
        response(res, 200, 'User added to project successfully');
    } catch (error) {
        next(error);
    }
};

const removeUserFromProject = async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id);
        const user = await User.findByPk(req.params.userId);
        if (!project || !user) {
            return response(res, 404, 'Project or User not found');
        }
        await project.removeUser(user);
        response(res, 200, 'User removed from project successfully');
    } catch (error) {
        next(error);
    }
};

const generateSchedule = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const { deadline, tasks } = req.body;

        // Generate Schedule
        let startDate = new Date();
        tasks.forEach(task => {
            task.startDate = new Date(startDate);
            task.endDate = new Date(startDate.setDate(startDate.getDate() + task.estimatedDuration));
            startDate = new Date(task.endDate.setDate(task.endDate.getDate() + 1));
        });

        response(res, 200, 'Schedule generated successfully', {
            projectId: parseInt(projectId),
            deadline,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject, getProjectUsers, addUserToProject, removeUserFromProject, generateSchedule };
