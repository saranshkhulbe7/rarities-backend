const User = require('../models/user.model')

module.exports.getAllUsers = async (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: 'Authorization required',
            data: null
        })
    }
    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                data: null
            })
        }
        if (user.role !== 'admin') {
            res.status(401).json({
                success: false,
                message: 'Authorization required',
                data: null
            })
        }
        const users = await User.find()
        res.status(200).json({
            success: true,
            message: 'All users fetched successfully',
            data: users
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error in fetching users',
            error: err.message
        })
    }
}

module.exports.getUserById = async (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: 'Authorization required',
            data: null
        })
    }
    try {
        const user = await User.findById(req.params.id).populate('leads')
        res.status(200).json({
            success: true,
            message: 'User details fetched successfully',
            data: user
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error in fetching user details',
            error: err.message
        })
    }
}