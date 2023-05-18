const HTTP_PORT = 7245;
const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const crypto = require('crypto');

var md5 = require("md5")

var serviceRouter = express.Router();

console.log('- Service Registrierung');
serviceRouter.use(bodyParser.urlencoded({ extended: false }));
serviceRouter.use(bodyParser.json());


serviceRouter.post('/register', (req, res)=>{


    var data = {
        username : req.body.uname,
        fullname : req.body.fullname,
        password : md5(req.body.psw)
    }
    
    
});


module.exports = serviceRouter;