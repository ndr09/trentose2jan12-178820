const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
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
/*
app.get('/apiary', function (req, res) {
       res.redirect('apiary');
    });
	*/
//user router
var usersRouter = express.Router();

usersRouter.route('/:id')
	.get(usersRoutes.get)
	.put(usersRoutes.update)
	.delete(usersRoutes.remove);
usersRouter.get('/',usersRoutes.get);
usersRouter.post('/',usersRoutes.add);
app.use('/Astro',usersRouter);

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
