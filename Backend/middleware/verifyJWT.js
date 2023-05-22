const jwt = require('jsonwebtoken');

require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const cookies = req.cookies = (req, res) =>{
        console.log("test")
        if(!cookies) return res.sendStatus(401);
        console.log(cookies.jwt);
        jwt.verify(
            token,
            process.env.ACCES_TOKEN_SECRET,
            (err, decoded) => {
                if(err) return res.sendStatus(403); // invalid token
                req.user = decoded.username;
                next();
            }
        );
    }
}

module.exports = verifyJWT


