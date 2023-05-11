const router = require('express').Router()
const auth = require('../middlewares/auth')


// UNAUTHENTICATED ROUTES
// router.use('/auth', require('./auth.route'))


// AUTHENTICATED ROUTES
// router.use(auth)
router.use('/city', require('./user.route'))

module.exports = router