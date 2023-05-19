const HTTP_PORT = 7245;
const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const { generateKeyPair, createCipheriv, randomBytes, createDecipheriv, privateDecrypt, privateEncrypt, createPrivateKey } = require('crypto');
const md5 = require("md5");
const { error } = require('console');

var serviceRouter = express.Router();

console.log('- Service Registrierung');
serviceRouter.use(bodyParser.urlencoded({ extended: false }));
serviceRouter.use(bodyParser.json());


const dbFile = './db/SicherInAlbstadt.sqlite3';
const dbConn = new sqlite.Database(dbFile, (err)=> {
	if (err){
		console.error(err.message)
	}else{
		console.log(`Connected to Database: ${dbFile} ... `);
	};
});


serviceRouter.post('/login', (req, res, next) => {
  const pw = md5(req.body.pswlog);
  let sql = `SELECT user_id FROM users WHERE username = "${req.body.unamelog}" AND password = "${pw}"`;
  var x;
  
  dbConn.all(sql,(err, rows) => {
    if(rows.length > 0){
      res.redirect('/home.html');
    }else{
      res.status(400);
      res.send('Invalid username or password');
    }
    if (err) {
      next(err);
      return;
    }
  });
});
  
  

module.exports = serviceRouter;