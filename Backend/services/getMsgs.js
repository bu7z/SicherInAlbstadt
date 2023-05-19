
const HTTP_PORT = 7245;
const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');

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


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


serviceRouter.get('/messages/:idSnd/:id', (req, res) => {
    console.log(id);
    let sql = `SELECT text, sender_id, receiver_id FROM messages WHERE (${req.params.idSnd} = sender_id AND ${req.params.idRcv} = receiver_id) OR (${req.params.idRcv} = sender_id AND ${req.params.idSnd} = receiver_id)`;
    var result = dbConn.run(sql,[]);
    res.status(200).json(result);
});


module.exports = serviceRouter;