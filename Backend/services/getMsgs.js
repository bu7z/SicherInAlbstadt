
const HTTP_PORT = 7245;
const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const credentials = require('../middleware/credentials');
const corsOptions = require('../config/corsOptions');
const jwt = require('jsonwebtoken');


var serviceRouter = express.Router();

// Database and Stuff copied from Kuti (kind of)
const dbFile = './db/SicherInAlbstadt.sqlite3';
const dbConn = new sqlite.Database(dbFile, (err)=> {
	if (err){
		console.error(err.message)
	}else{
		console.log(`Connected to Database: ${dbFile} ... `);
	};
});

const app = express();

// still from Kuti
// provide service router with database connection / store the database connection in global server environment
app.locals.dbConnection = dbConn;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


serviceRouter.get('/messages/:idSnd/:idRcv', (req, res) => {
	
	var token = jwt.decode(req.cookies["jwt"]);
	var userID = token["user_id"]
	var rcvID = req.params.idRcv;
			sql = `SELECT * FROM messages where (sender_id = ${userID} AND receiver_id = ${rcvID} ) OR (${rcvID} = sender_id AND ${userID} = receiver_id)`;
	
			dbConn.all(sql,(err,rows) => {
				if(rows){
					sql = 'UPDATE messages SET flag_seen = 1 WHERE msg_id = ? AND receiver_id = ?'
					rows.forEach(row =>{
						dbConn.all(sql,[row["msg_id"], userID])
					})

					res.status(200).json(rows)
					console.log("chat messages send")
					return
				}else{
					console.log("no new messages")
					//TODO: something should happen here
				}
				if(err){
					console.log(err);
					return;
				}
			});	
});



serviceRouter.get('/users/:name([a-zA-Z]+)', (req, res) => {
	console.log(req.params.name);

			sql = `SELECT * FROM users where username = '${req.params.name}'`;
			dbConn.all(sql,(err,rows) => {
				if(rows){			

					res.status(200).json(rows)
					console.log("User Found")
					return
				}else{
					console.log("No User");
					res.status(404);
				}
				if(err){
					console.log(err);
					return;
				}
			});	
});


serviceRouter.get('/convos', (req, res) => {
	
	var token = jwt.decode(req.cookies["jwt"]);
	var userID = token["user_id"]

	

			sql = `select distinct user_id, username from messages LEFT JOIN users ON messages.receiver_id = users.user_id where sender_id = ${userID} UNION SELECT DISTINCT users.user_id, users.username FROM messages LEFT JOIN users ON messages.sender_id = users.user_id WHERE receiver_id = ${userID};`

			dbConn.all(sql,(err,rows) => {
				if(rows){
					console.log(rows)
					res.status(200).json(rows)
					console.log("chat messages send")
					return
				}else{
					console.log("no new messages")
					//TODO: something should happen here
				}
				if(err){
					console.log(err);
					return;
				}
			});	
});




module.exports = serviceRouter;