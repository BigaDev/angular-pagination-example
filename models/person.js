var restful = require('node-restful');
var mongoose = restful.mongoose;
var uniqueValidator = require('mongoose-unique-validator');

// Schema 
Person.schema = new mongoose.Schema({
	name: { type : String , required : true },
	phoneNumber: { type : String , unique : true, required : true },
	created_at: { type: Date, default: Date.now }
});

// Validations
Person.schema.plugin(uniqueValidator, { message: 'Error, {PATH} is already exist' });

// load mongoose model
Person.model = mongoose.model('person', Person.schema);

//constructor
function Person(){

}

module.exports = restful.model('Persons', Person.schema);
