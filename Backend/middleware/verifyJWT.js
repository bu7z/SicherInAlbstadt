const jwt = require('jsonwebtoken');

require('dotenv').config();

const verifyJWT = (req, res, next) => {
    console.log("authentifizierung")
    if(req.cookies["JWT"]) {
        console.log("coookie is set")
        next();
    }
    else{
        console.log("no cookie => /")
        res.status(404).redirect('/')
    }
}

module.exports = verifyJWT


