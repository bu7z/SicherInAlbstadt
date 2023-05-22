const HTTP_PORT = 7245;
const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const dbFile = './db/SicherInAlbstadt.sqlite3';
const dbConn = new sqlite.Database(dbFile, (err)=> {
	if (err){
		console.error(err.message)
	}else{
		console.log(`Connected to Database: ${dbFile} ... `);
	};
});

var serviceRouter = express.Router();

serviceRouter.get('/messages', (req, res) => {
    const sql = 'SELECT * FROM messages WHERE receiver_id = 6206 and sender_id = 6206'

    dbConn.all(sql, [], (err, result) => {
        if (err){
            throw result;
        }
       console.log(result);
       res.json(result)
    });
});

module.exports = serviceRouter;