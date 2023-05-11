const router = require('express').Router()

const { signup, signin, signout, getProfile } = require('../controllers/auth.controller')

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.post('/me', getProfile)

module.exports = router