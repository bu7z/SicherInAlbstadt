const HTTP_PORT = 7245;
const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');

var serviceRouter = express.Router();

console.log('- Service Registrierung');


serviceRouter.post('/register', (req, res)=>{
	var username = req.body.uname;
    var fullname = req.body.fullname;
    var password = bcrypt.hash(req.body.psw, 0,function(err,hash){
		console.log(hash);
	});
	console.log(`entered username: ${username}`);


	crypto.generateKeyPair
});


module.exports = serviceRouter;