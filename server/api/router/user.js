import express from 'express'
import * as userController from '../controller/user.js'

const route = express.Router()

// @route POST /user/register
// @desc Register user
// @access Public
route.post('/user/register', userController.registerUser)

// @route GET /user/pagination
// @desc Pagination user
// @access Public
route.get('/user/pagination', userController.paginationUser)

// @route PUT /user/update
// @desc Update user
// @access Public
route.put('/user/update/:id', userController.updateUser)

// @route DELETE /user/delete
// @desc Delete user
// @access Public
route.delete('/user/delete/:id', userController.deleteUser)

// @route GET /user/search-pagination
// @desc Search pagination user
// @access Public
route.get('/user/search-pagination', userController.searchPaginationUser)

export default route
