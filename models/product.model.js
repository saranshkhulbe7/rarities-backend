const { Schema, model } = require('mongoose')


const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        min_bid_price: {
            type: Number,
            required: true,
        },
        current_bid_price: {
            type: Number,
            required: true,
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: "category",
        },
        status: {
            type: String,
            enum: ["sold", "unsold"],
            default: "unsold",
        },
        description: {
            type: String,
            required: true,
        }
    },
    {
        versionKey: false,
        timestamps: true,
    },

);

module.exports = model('product', productSchema)