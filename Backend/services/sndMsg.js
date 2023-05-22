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


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

serviceRouter.post('/sndMsg', (req, res) => {

    
	var token = jwt.decode(req.cookies["jwt"]);
	var userID = token["user_id"]

    var text = req.body["text"];
    var sndID = userID
    var rcvID = req.body["reciever_id"];
    var symkeyS = "symKeyENCbysender"
    var symkeyR = "symKeyENCbyreceiver"

    if (userID === 7){
        rcvID = 3;
    }

    sql = `INSERT INTO messages (text,sender_id,receiver_id,sym_key_sender,sym_key_receiver,flag_seen) VALUES (?,?,?,?,?,?)`;

    dbConn.run(sql, [text,sndID,rcvID,symkeyS,symkeyR,0], function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
    })
})



module.exports = serviceRouter;