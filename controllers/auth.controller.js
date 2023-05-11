require("dotenv").config();
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const generateUniqueId = require('../utils/uidGenerator')

const Cryptr = require('cryptr');
const { getEnvironment } = require("../config/environment");
const cryptr = new Cryptr(getEnvironment().CRYPTR_SECRET)

module.exports.signup = async (req, res, next) => {
    try {
        const {
            email, password, name
        } = req.body;
        if (!email || !password || !name) {
            return res.status(400).send({
                status: false,
                error: true,
                message: "Please provide all the required fields",
                data: null
            })
        }
        const hash = cryptr.encrypt(password)
        if (!hash) {
            return res.status(400).send({
                status: false,
                error: true,
                message: "Password not hashed",
                data: null
            })
        }
        const newUser = await User.create({
            name,
            email,
            password: hash,
            userId: `u` + generateUniqueId()
        })
        if (!newUser) {
            return res.status(400).send({
                status: false,
                error: true,
                message: "User not created!",
                data: null
            })
        }
        return res.status(200).send({
            status: true,
            error: false,
            message: "User created successfully",
            data: newUser
        })
    }
    catch (err) {
        console.log(err)
        if (err.code === 11000) {
            return res.status(400).send({
                status: false,
                error: true,
                message: "User already exists with this email",
                data: null
            })
        }
        return res.status(500).send({
            status: false,
            error: true,
            message: err.message,
            data: null
        })
    }
}

module.exports.signin = async (req, res, next) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return res.status(400).send({
                status: false,
                error: true,
                message: "Please provide all the required fields",
                data: null
            })
        }
        const data = await User.findUserByCredentials(email, password)
        if (!data.status) {
            return res.status(400).send({
                status: false,
                message: data.message,
                data: null
            })
        }
        const token = jwt.sign(
            { _id: data.data._id },
            getEnvironment().JSON_SECRET,
            { expiresIn: '7d' },
        );
        if (!token) {
            return res.status(400).send({
                status: false,
                message: "Token not generated",
                data: null
            })
        }
        const user = await User.findByIdAndUpdate(data.data._id, { token }, { new: true })
        if (!user) {
            return res.status(400).send({
                status: false,
                message: "User not found",
                data: null
            })
        }
        return res.status(200).send({
            status: true,
            message: "User logged in successfully",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: user.token,
                userId: user.userId,
                role: user.role
            }
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({
            status: false,
            message: err.message,
            data: null
        })
    }
}

module.exports.signout = async (req, res, next) => {
    try {
        const { token } = req.body
        if (!token) {
            return res.status(400).send({
                status: false,
                message: "Please provide the token",
                data: null
            })
        }
        const user = await User.findOne({ token })
        if (!user) {
            return res.status(400).send({
                status: false,
                message: "User not found",
                data: null
            })
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, { token: null }, { new: true })
        if (!updatedUser) {
            return res.status(400).send({
                status: false,
                error: true,
                message: "User not found",
                data: null
            })
        }
        return res.status(200).send({
            status: true,
            message: "User signed out successfully",
            data: null
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({
            status: false,
            message: err.message,
            data: null
        })
    }
}

module.exports.getProfile = async (req, res, next) => {
    try {
        const { token } = req.body
        if (!token) {
            return res.status(400).send({
                status: false,
                message: "Please provide the token",
                data: null
            })
        }
        const user = await User.findOne({
            token
        })
        if (!user) {
            return res.status(400).send({
                status: false,
                message: "User not found",
                data: null
            })
        }
        return res.status(200).send({
            status: true,
            message: "User profile fetched successfully",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message,
            data: null
        })
    }
}

module.exports.updateProfile = async (req, res, next) => { }

module.exports.forgotPassword = async (req, res, next) => { }

module.exports.resetPassword = async (req, res, next) => { }