const crypto = require('crypto');

const generateUniqueId = () => {
    const currentYear = new Date().getFullYear().toString().substr(-2);
    return currentYear + crypto.randomBytes(3).toString('hex');
};

module.exports = generateUniqueId;