const HTTP_PORT = 7245;
const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const dbFile = './db/SicherInAlbstadt.sqlite3';
const dbConnection = new sqlite.Database(dbFile, (err)=> {
	if (err){
		console.error(err.message)
	}else{
		console.log(`Connected to Database: ${dbFile} ... `);
	};
});

var serviceRouter = express.Router();

serviceRouter.get('/home_name', (req, res)=>{
    var token = jwt.decode(req.cookies["jwt"]);
	var userID = token["user_id"]
        const sql = `SELECT username FROM users WHERE user_id = ${userID}`;
        dbConnection.get(sql, (err, result) => {
            if(err){
                throw err;
            }
            const name = result.username;
            res.send(`Herzlich Wilkommen ${name}!`);
        });
    });

serviceRouter.get('/home_anznachr', (req, res)=>{
    var token = jwt.decode(req.cookies["jwt"]);
	var userID = token["user_id"]
    const sql = `SELECT COUNT(*) as count FROM messages WHERE flag_seen = 0 AND receiver_id = ${userID}`;
    dbConnection.get(sql, (err, result) => {
        if (err){
            throw err;
        }
        const anzahl = result.count;
        if (anzahl == 0){
            res.send(`Sie haben keine neue Nachrichten`)
        }
        if (anzahl == 1){
            res.send(`Sie haben 1 neue Nachricht`);
        } 
        if (anzahl > 1){
            res.send(`Sie haben ${anzahl} neue Nachrichten`);
        }
    });
    });

module.exports = serviceRouter;