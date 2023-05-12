const Product = require('../models/product.model');

module.exports.createProduct = async (req, res, next) => {
    try {
        const { name, price, description, category, image } = req.body
        if (!name || !price || !description || !category || !image) {
            return res.status(400).send({
                status: false,
                message: "Please provide all the required fields",
                data: null
            })
        }
        const product = await Product.create({
            name,
            price,
            description,
            category,
            image
        })
        if (!product) {
            return res.status(400).send({
                status: false,
                message: "Product not created",
                data: null
            })
        }
        return res.status(200).send({
            status: true,
            message: "Product created successfully",
            data: product
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

module.exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
        if (!products) {
            return res.status(400).send({
                status: false,
                message: "No products found",
                data: null
            })
        }
        return res.status(200).send({
            status: true,
            message: "Products found",
            data: products
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