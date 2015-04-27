var express = require('express');
var app = express();        
var mongoose = require('mongoose');         
var morgan = require('morgan');      
var bodyParser = require('body-parser');   
var methodOverride = require('method-override'); 

var MongoClient = require('mongodb').MongoClient;

// mongoose.connect('mongodb://localhost/nba');     // connect to mongoDB database on modulus.io

var db;
var leadersColl;

MongoClient.connect('mongodb://localhost/nba', function(err, database) {
  // assert.equal(null, err);
  if (err) console.log(err);
  console.log('\n**************************************');
  console.log("*  Connected correctly to database   *");
  console.log('**************************************\n');
  
  db = database;
  leadersColl = db.collection('leaders');

});

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

app.get('/:category', function(req, res) {
 db.collection('leaders').find({ 'category': req.params.category }).toArray(function(err, leaders) {
   // console.log(leaders[0].leaders);
   res.send(leaders[0].leaders)
 });

});

app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});