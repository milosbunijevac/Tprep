var db = require('./db.js').connection;

var getBasicUser = function(cb){
   db.query('SELECT * FROM users', function(error, results) {
    if(error) {
      cb(error, null);
    } else {
      cb(null, results);
    }
  })
}

var insertUser = function(user, cb) {
  var userinput = user;
  db.query("INSERT INTO users (person) VALUES (?)", user, function(error, results) {
    if (error) {
      cb(error, null);
    } else {
      cb(null, results);
    }
  });
}

var getValue = function(cb) {
  db.query("SELECT value FROM numberStore WHERE id=1", function(error, results) {
    if(error){
      cb(error, null)
    } else {
      cb(null, results);
    }
  })
}

module.exports.getBasicUser = getBasicUser;
module.exports.insertUser = insertUser;
module.exports.getValue = getValue;
