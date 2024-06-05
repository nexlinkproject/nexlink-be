const { Users } = require('../models')
const { response } = require('../utils/middleware')

const getUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll()
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
    const user = await Users.findByPk(req.params.id)
    if (!user) {
      return response(res, 404, `Users with ID: ${req.params.id} not found`)
    }
    response(res, 200, `Users ${user.fullName} retrieved successfully`, { user })
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

    const user = await Users.findByPk(userId)
    if (!user) {
      return response(res, 404, `Users with ID: ${userId} not found`)
    }

    const emailMatch = await Users.findOne({ where: { email } })

    if (email === user.email) {
        return response(res, 400, 'Fill other email')
    }

    if (emailMatch) {
      return response(res, 400, 'Email is already used!')
    }

    const [updated] = await Users.update(req.body, { where: { id: userId } })
    if (!updated) {
      return response(res, 404, `Users with ID: ${userId} not found`)
    }

    const updatedUser = await Users.findByPk(userId)
    response(res, 200, `Users ${user.fullName} updated successfully`, { updatedUser })
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.params.id)
    const deleted = await Users.destroy({ where: { id: req.params.id } })
    if (!deleted) {
      return response(res, 404, `Users with ID: ${req.params.id} not found`)
    }
    response(res, 200, `Users ${user.fullName} deleted successfully`)
  } catch (error) {
    response(res, 500, 'Internal Server Error', { error: error.message })
    console.log(error)
    next(error)
  }
}

module.exports = { getUsers, getUserById, updateUser, deleteUser }
