const router = require('express').Router()
const auth = require('../middlewares/auth')


// UNAUTHENTICATED ROUTES
router.use('/auth', require('./auth.route'))


// AUTHENTICATED ROUTES
// router.use(auth)
router.use('/product', require('./product.route'))
router.use('/category', require('./category.route'))


module.exports = router