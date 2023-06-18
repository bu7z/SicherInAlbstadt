const jwt = require('jsonwebtoken');

require('dotenv').config();

const verifyJWT = (req, res, next) => {
    console.log("authentifizierung")
    next();
}

module.exports = verifyJWT


