var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mysql = require('mysql')
var fs = require('fs')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer')
var log4js = require('./logs/start_log.js')
var request = require('request')
var session = require('express-session');
var RedisStore = require('connect-redis')(session)
var ejs = require('ejs')

global.CONFIG = JSON.parse(fs.readFileSync('./config.json').toString())
var indexRouter = require('./routes/index');

var app = express();

// var objMulter = multer({dest : 'public/images'})
// app.use(objMulter.any())
// view engine setup
app.engine('.html',ejs.__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/index')(app)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
var options = {
  host:'127.0.0.1',
  port:'6379'
}
app.use(session({
  store:new RedisStore(options),
  secret:'langjie',
  resave:false,
  cookie:{maxAge:30*60},
  saveUninitialized:true
}))

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  
});
process.on('uncaughtException', function (err) {
  LOG(err.stack);
});
var Pool =  mysql.createPool({
  host:CONFIG.mysql_host,
  user:CONFIG.mysql_user,
  port:CONFIG.mysql_port,
  password:CONFIG.mysql_password,
  database:'lj_mp'
})
global.CON = function(sql,val,callback){
  Pool.getConnection(function(err,conn){
    if(err){
      callback(err,null,null)
    }else{
      conn.query(sql,val,function(qerr,vals,fields){
        callback(qerr,vals,fields)
      })
      conn.release()
    }
  })
}
global.LOG = function(info){
  var logger = log4js.getLogger('log_file')
  logger.info(info)
  console.log(info)
}
global.DIRNAME = __dirname;
//事务回滚
global.ROLLBACK = function(callback){
  Pool1.getConnection(function(err,conn){
    if(err){
      callback(err)
    }else{
      callback(null,conn)
    }
  })
}
module.exports = app;
