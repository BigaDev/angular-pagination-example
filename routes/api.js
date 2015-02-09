var express = require('express');
var router = express.Router();

//Models
var Person = require('../models/person');

//Routes
Person.methods(['get', 'post', 'put', 'delete']);
Person.register(router, '/persons')

module.exports = router;