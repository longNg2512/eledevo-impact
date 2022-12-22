import userModel from '../model/user.js'

// @route POST /user/register
// @desc Register user
// @access Public
export const registerUser = async (req, res) => {
    const { username, password, dateOfBirth, userStatus } = req.body

    // Simple validation
    if (!username || !password)
        return res.status(400).json({
            success: false,
            message: 'Missing username or password !!!',
        })

    try {
        // Check for existing user
        const user = await userModel.findOne({ username })

        if (user)
            return res
                .status(400)
                .json({ success: false, message: 'Username already take !!!' })

        //All good
        const response = await userModel.create({
            username,
            password,
            dateOfBirth,
            userStatus,
        })
        res.status(201).json({
            success: true,
            message: 'Register user successfully!',
            response,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error !!!',
        })
    }
}

// @route GET /user/pagination
// @desc Pagination user
// @access Public
export const paginationUser = async (req, res) => {
    const activePage = parseInt(req.query.activePage)
    const limit = parseInt(req.query.limit)
    const skip = (activePage - 1) * limit
    try {
        const totalUser = await userModel.countDocuments()
        const totalPage = Math.ceil(totalUser / limit)
        const response = await userModel.find().skip(skip).limit(limit)
        res.json({
            success: true,
            message: 'Pagination user successfully!',
            response,
            activePage,
            totalPage,
            skip,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error !!!',
        })
    }
}

// @route PUT /user/update
// @desc Update user
// @access Public
export const updateUser = async (req, res) => {
    const { username, password, dateOfBirth, userStatus } = req.body

    // Simple validation
    if (!username || !password)
        return res.status(400).json({
            success: false,
            message: 'Missing username or password !!!',
        })

    try {
        // All good
        const response = await userModel.findByIdAndUpdate(req.params.id, {
            username,
            password,
            dateOfBirth,
            userStatus,
        })
        res.json({
            success: true,
            message: 'Update user successfully!',
            response,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error !!!',
        })
    }
}

// @route DELETE /user/delete
// @desc Delete user
// @access Public
export const deleteUser = async (req, res) => {
    try {
        const response = await userModel.findByIdAndDelete(req.params.id)
        res.json({
            success: true,
            message: 'Delete user successfully!',
            response,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error !!!',
        })
    }
}

// @route GET /user/search-pagination
// @desc Search pagination user
// @access Public
export const searchPaginationUser = async (req, res) => {
    const textSearch = req.query.textSearch
    const activePage = parseInt(req.query.activePage)
    const limit = parseInt(req.query.limit)
    const skip = (activePage - 1) * limit
    try {
        const totalUser = await userModel.countDocuments({
            username: { $regex: textSearch, $options: 'i' },
        })
        const totalPage = Math.ceil(totalUser / limit)
        const response = await userModel
            .find({ username: { $regex: textSearch, $options: 'i' } })
            .skip(skip)
            .limit(limit)
        res.json({
            success: true,
            message: 'Search pagination user successfully!',
            response,
            activePage,
            totalPage,
            skip,
            textSearch,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error !!!',
        })
    }
}
