const HTTP_PORT = 7245;
const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');

var serviceRouter = express.Router();

serviceRouter.get('/home', (req, res)=>{
        var name = 'marcel';
        res.send(`Herzlich Wilkommen ${name}!`);
    });


module.exports = serviceRouter;