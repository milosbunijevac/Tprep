var express = require('express');
var app = express()
var bodyParser = require('body-parser');
var path = require('path');
var dbhelpers = require('../db/dbhelpers.js');

var port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function (req, res, next) {
  
      // Website you wish to allow to connect

      res.setHeader('Access-Control-Allow-Origin', '*');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      // Pass to next layer of middleware
      next();
  });

app.get('/', function(req, res) {

  res.sendFile(path.join(__dirname, '../public/src', 'index.html'))
})

app.get('/getValue', function(req, res) {
  dbhelpers.getValue(function(error, result) {
    if(error){
      console.log('This is the error in the controller ', error);
    } else {
      res.send(result);
    }
  })
})

app.post('/', function(req, res) {
  console.log(req.body);
  dbhelpers.getBasicUser(function(error, result) {
    if(error){
      console.log('this is an error in the controller: ', error);
    } else {
      console.log('This is the result from the DB: ', result[0].person);
      res.send(JSON.stringify(result[0].person))
    }
  })
  
})

app.post('/newValue', function(req, res) {
  dbhelpers.insertValue(req.body.newValue, function(error, results) {
    if(error){
      console.log('error: ', error);
    } else {
      res.send(JSON.stringify(results));
    }
  })
})

app.post('/inputTest', function(req, res) {
  console.log('This is the output of the inputTest: ', req.body);
  console.log('At least it was hit!');
  dbhelpers.insertUser(req.body.namevalhere, function(error, result) {
    if(error){
      console.log(error);
    } else {
      res.send(result);
    }
  })
})

app.listen(port, function(error) {
  if(error){
    console.log(error);
  }
  console.log('Express is listening on port: ', port);
})