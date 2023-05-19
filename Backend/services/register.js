const HTTP_PORT = 7245;
const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const { generateKeyPair, createCipheriv, randomBytes, createDecipheriv, privateDecrypt, privateEncrypt, createPrivateKey } = require('crypto');


var md5 = require("md5")

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


serviceRouter.post('/register', (req, res)=>{
    
    generateKeyPair('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        }
        }, (err, publicKey, privateKey) => {
            
            let sql = 'INSERT INTO users (username, password, key_public, key_private) VALUES (?,?,?,?)';
            dbConn.run(sql, [req.body.uname, md5(req.body.psw), privateKey, publicKey], function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.redirect('/')
            
        
        });
    });
});
//TODO: encrpyt/decrypt private Key!!!!


module.exports = serviceRouter;