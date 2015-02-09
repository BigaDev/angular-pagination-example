var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

// Mongodb connection
mongoose.connect('mongodb://localhost/phonebook');

// init
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//config
app.use("/bower_components", express.static(__dirname + '/bower_components'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/views", express.static(__dirname + '/public/views'));

// Routes
app.use('/api', require('./routes/api'));
app.get("/app", function(req, res) {
	console.log("sending home page")
	res.sendFile(path.join(__dirname, './public/views', 'index.html'));
});

//start server
app.listen(3000);
console.log("API is running");