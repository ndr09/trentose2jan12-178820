const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const qs = require('querystring');
const usersRoutes = require('./route/usersRoutes.js');

const app = express();

// Database connection

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware route to support CORS and preflighted requests
app.use(function (req, res, next) {
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});


//Libraries

var http = require('http');

 





app.get('/', function (req, res) {
        fs.readFile('./html/start.html', function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
		});
        //res.redirect('./html/start.html');
    });
/*
app.get('/apiary', function (req, res) {
       res.redirect('apiary');
    });
	*/
//user router
var usersRouter = express.Router();
usersRouter.route('/')
	.get(usersRoutes.get)
	.post(usersRoutes.add)
	.put(usersRoutes.update)
	.delete(usersRoutes.remove);

app.use('/users',usersRouter);

// handle invalid requests and internal error
app.use((req, res, next) => {
	const err = new Error('Not Found testing ');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
    res.json({ error: { message: err.message } });
});

// Set the port number
app.set('port', process.env.PORT || 3000);
// Start the server
app.listen(app.get('port'));
console.log('Server started! Running on port: ' + app.get('port'));
