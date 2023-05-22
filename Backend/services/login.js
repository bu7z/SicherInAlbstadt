const HTTP_PORT = 7245;
const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const { generateKeyPair, createCipheriv, randomBytes, createDecipheriv, privateDecrypt, privateEncrypt, createPrivateKey } = require('crypto');
const md5 = require("md5");
// user authentication
const jwt = require('jsonwebtoken')
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path')

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
  
  
  dbConn.all(sql,(err, rows) => {
    if(rows.length > 0){
      var userID = rows[0]["user_id"]
      // create JWT
      const accessToken = jwt.sign(
          {"user_id": userID},
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn: '1d'} // INCREASE LATER
        );

      res.cookie('jwt', accessToken, {httpOnly:false,sameSite: 'None', maxAge: 24*60*60*1000});
      res.redirect('/home.html');

    }else{
      res.status(400)
      res.redirect('/wronfullogin.html');

    }
    if (err) {
      next(err);
      return;
    }
  });
});
  

module.exports = serviceRouter;