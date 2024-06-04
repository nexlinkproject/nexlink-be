const { User } = require('../models')
const { response } = require('../utils/middleware')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll()
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
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return response(res, 404, `User with ID: ${req.params.id} not found`)
    }
    response(res, 200, `User ${user.fullName} retrieved successfully`, { user })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id
    const { email } = req.body

    const user = await User.findByPk(userId)
    if (!user) {
      return response(res, 404, `User with ID: ${userId} not found`)
    }

    const emailMatch = await User.findOne({ where: { email } })

    if (email === user.email) {
        return response(res, 400, 'Fill other email')
    }

    if (emailMatch) {
      return response(res, 400, 'Email is already used!')
    }

    const [updated] = await User.update(req.body, { where: { id: userId } })
    if (!updated) {
      return response(res, 404, `User with ID: ${userId} not found`)
    }

    const updatedUser = await User.findByPk(userId)
    response(res, 200, `User ${user.fullName} updated successfully`, { updatedUser })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const deleted = await User.destroy({ where: { id: req.params.id } })
    if (!deleted) {
      return response(res, 404, `User with ID: ${req.params.id} not found`)
    }
    response(res, 200, `User ${user.fullName} deleted successfully`)
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

module.exports = { getUsers, getUserById, updateUser, deleteUser }
