require("dotenv").config()

const jwt = require('jsonwebtoken')
const { getEnvironment } = require('../config/environment')

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).send({ message: 'Authorization required!' });
        }
        const token = authorization.replace('Bearer ', '');
        let payload = jwt.verify(token, getEnvironment().JSON_SECRET)
        req.user = payload; 
        next();
    }
    catch (err) {
        console.log(err)
        return res.status(401).send({ message: err.message });
    }
};
