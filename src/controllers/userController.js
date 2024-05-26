const { User } = require('../models');
const response = require('../utils/response');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        response(res, 200, 'Users retrieved successfully', { users });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return response(res, 404, 'User not found');
        }
        response(res, 200, 'User retrieved successfully', { user });
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        response(res, 201, 'User created successfully', { user });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const [updated] = await User.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return response(res, 404, 'User not found');
        }
        const updatedUser = await User.findByPk(req.params.id);
        response(res, 200, 'User updated successfully', { updatedUser });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return response(res, 404, 'User not found');
        }
        response(res, 200, 'User deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
