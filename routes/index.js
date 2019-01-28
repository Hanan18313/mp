var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = function(app){
  require('./common')(app)
  require('./alumni')(app)
  require('./annual')(app)
  require('./reunion')(app)
}
