const { createCategory, getAllCategories } = require('../controllers/category.controller')

const router = require('express').Router()

router.post('/', createCategory)
router.get('/all', getAllCategories)

module.exports = router