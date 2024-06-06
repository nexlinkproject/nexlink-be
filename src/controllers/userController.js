const userService = require('../services/userService')
const { response } = require('../utils/middleware')
const { validate: uuidValidate } = require('uuid')

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.findAllUsers()
    if (users.length === 0) {
      return response(res, 404, 'No users found')
    }
    response(res, 200, 'All users retrieved successfully', { users })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    if (!uuidValidate(req.params.id)) {
      return response(res, 404, `User with ID: ${req.params.id} was not found`)
    }
    const user = await userService.findUserById(req.params.id)
    if (!user) {
      return response(res, 404, `User with ID: ${req.params.id} was not found`)
    }
    response(res, 200, 'User retrieved successfully', { user })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id
    if (!uuidValidate(req.params.id)) {
      return response(res, 404, `User with ID: ${userId} not found`)
    }
    const { email } = req.body

    const user = await userService.findUserById(userId)
    if (!user) {
      return response(res, 404, `User with ID: ${userId} not found`)
    }

    const emailMatch = await userService.findUserByEmail(email)
    if (email === user.email) {
      return response(res, 400, 'Email is already used!')
    }

    if (emailMatch) {
      return response(res, 400, 'Fill other email')
    }

    const [updated] = await userService.updateUser(userId, req.body)
    if (!updated) {
      return response(res, 404, `User with ID: ${userId} not found`)
    }

    const updatedUser = await userService.findUserById(userId)
    response(res, 200, 'User updated successfully', { updatedUser })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id
    if (!uuidValidate(userId)) {
      return response(res, 404, `User with ID: ${userId} not found`)
    }
    const userExist = await userService.findUserById(userId)
    if (!userExist) {
      return response(res, 404, `User with ID: ${userId} not found`)
    }
    response(res, 200, 'User deleted successfully')
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

module.exports = { getUsers, getUserById, updateUser, deleteUser }
