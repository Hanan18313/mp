var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function(app){
//  require('./miniDisplay')(app);
  require('./notice')(app);
  require('./canvas')(app);
}
