
// WebAnwednung 2 Projekt
// Sicher InAlbstadt
// Version 1.0


const HTTP_PORT = 7245;
const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const cookieParser = require("cookie-parser");

// Database and Stuff copied from Kuti (kind of)
const dbFile = './db/SicherInAlbstadt.sqlite3';

const dbConnection = new sqlite.Database(dbFile, (err)=> {
	if (err){
		console.error(err.message)
	}else{
		console.log(`Connected to Database: ${dbFile} ... `);
	};
});

const app = express();
app.use(cookieParser());

// provide service router with database connection / store the database connection in global server environment
app.locals.dbConnection = dbConnection;

app.use(credentials);

// app.use(cors(corsOptions)); // is destroying site dont uncomment!
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//display index.html
app.use(express.static('../Frontend'));

var serviceRouter = require('./services/register.js');
app.use(serviceRouter);

var serviceRouter = require('./services/login.js');
app.use(serviceRouter);

// app.use(verifyJWT);

app.use(express.static('../Frontend/chat_page.html'));

var serviceRouter = require('./services/home.js');
app.use(serviceRouter);

var serviceRouter = require('./services/getMsgs.js');
app.use(serviceRouter);

var serviceRouter = require('./services/sndMsg.js');


app.use(serviceRouter);



const server = app.listen(HTTP_PORT, () => {
	console.log(`Server Started on Port ${HTTP_PORT} ... `);
});

app.get('/messages/:id', (req, res) =>{
	res.send(`Hello ${req.params.id}`)
});
