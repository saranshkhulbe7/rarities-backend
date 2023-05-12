const Category = require('../models/category.model.js');

module.exports.createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).send({
                status: false,
                message: "Please provide all the details",
                data: null
            })
        }
        const category = await Category.create({
            name,
            description
        })
        if (!category) {

            return res.status(400).send({
                status: false,
                message: "Category not created",
                data: null
            })
        }
        return res.status(200).send({
            status: true,
            message: "Category created successfully",
            data: category
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

module.exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find()
        if (!categories) {
            return res.status(400).send({
                status: false,
                message: "Categories not found",
                data: null
            })
        }
        return res.status(200).send({
            status: true,
            message: "Categories found",
            data: categories
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