
const HTTP_PORT = 7245;
const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const credentials = require('../middleware/credentials');
const corsOptions = require('../config/corsOptions');

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
    let sql = `SELECT * FROM messages where (sender_id = ${req.params.idSnd} AND receiver_id = ${req.params.idRcv} ) OR (${req.params.idRcv} = sender_id AND ${req.params.idSnd} = receiver_id)`;
	
    dbConn.all(sql,(err,rows) => {
		if(rows){
			res.status(200).json(rows)
		}else{
			console.log("no new messages")
			//TODO: something should happen here
		}
		console.log(rows);
		if(err){
			console.log(err);
			return;
		}
	});

	
});


module.exports = serviceRouter;