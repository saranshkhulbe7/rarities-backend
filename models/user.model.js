require("dotenv").config()
const { CRYPTR_SECRET } = process.env
const { Schema, model } = require('mongoose')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(CRYPTR_SECRET)

const userSchema = new Schema(
    {
        name: {
            type: String,
            minlength: 3,
            maxlength: 30,
        },
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
            minlength: 4,
        },
        role: {
            type: String,
            enum: ["admin", "buyer","seller"],
            default: "buyer",
            required: true,
        },
        balance: {
            type: Number,
            default: 0,
        },
        phone: {
            type: String,
            minlength: 10,
            maxlength: 10,
            default: null,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        token: {
            type: String,
            default: null
        },
        otp: {
            type: String,
            default: null,
            minLength: 6,
            maxLength: 6,
        },
        bids: [
            {
                type: Schema.Types.ObjectId,
                ref: "bid",
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

userSchema.statics.findUserByCredentials = async (email, password) => {
    try {
        if (!email || !password) {
            let res = {
                status: false,
                message: "Please provide all the required fields",
                data: null
            }
            return res
        }
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            let res = {
                status: false,
                message: "User not found!",
                data: null
            }
            return res
        }
        const isvalid = cryptr.decrypt(user.password) === password
        if (!isvalid) {
            let res = {
                status: false,
                message: "Invalid credentials",
                data: null
            }
            return res
        }
        let res = {
            status: true,
            message: "User found",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        }
        return res
    }
    catch (err) {
        console.log(err)
        let res = {
            status: false,
            message: err.message,
            data: null
        }
        return res
    }

};

const User = model('user', userSchema);
module.exports = model('user', userSchema);