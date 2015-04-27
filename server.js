var express = require('express');
var app = express();               
var morgan = require('morgan');      
var bodyParser = require('body-parser');   
var MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://localhost/nba', function(err, database) {
  if (err) console.log(err);
  console.log('\n**************************************');
  console.log("*  Connected correctly to database   *");
  console.log('**************************************\n');
  
  db = database;

});

app.use(express.static(__dirname + '/public'));   
app.use(morgan('dev'));                                 

app.listen(8080);
console.log("App listening on port 8080");

app.get('/:category', function(req, res) {
 db.collection('leaders').find({ 'category': req.params.category }).toArray(function(err, leaders) {
   res.send(leaders[0].leaders)
 });
});

app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});