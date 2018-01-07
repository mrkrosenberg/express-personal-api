///////////////////////
// import dependencies
///////////////////////

var express = require('express');  //requires express
var areasRouter = express.Router();  //saves the router function (wrapper for express functions) to variable router

///////////////
//body parser **unpacks data and populates req.body object
///////////////

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


///////////
// Routes
///////////

router.get('/', function indexAll(req, res){
	//responds with all of the profiles in the database
});

router.get('/:id', function showProfile(req, res){
	//responds with a specific profile that matches the id in req.body
});

router.post('/', function createProfile(req, res){
	//creates a new profile and saves it to the database
});

router.put('/:id', function updateProfile(){
	//updates specified properties of a specific profile and saves it back to the database
});

router.delete('/:id', function deleteProfile(){
	//deletes a specified profile from the database
});





/////////////
// Exports
/////////////
module.exports = areasRouter;