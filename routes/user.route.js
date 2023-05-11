const router = require('express').Router()

const {
    getAllUsers, getUserById,
} = require('../controllers/user.controller')

router.get('/all', getAllUsers)
router.get('/:id', getUserById)

module.exports = router