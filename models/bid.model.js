const { Schema, model } = require('mongoose')

const bidSchema = new Schema(
    {
        bidId: {
            type: String,
            required: true,
            unique: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        buyerId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "product",
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

module.exports = model('bid', bidSchema)