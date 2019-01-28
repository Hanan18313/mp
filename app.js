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
global.CONFIG = JSON.parse(fs.readFileSync('./config.json').toString())
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var objMulter = multer({dest : 'public/images'})
app.use(objMulter.any())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var Pool1 =  mysql.createPool({
  host:CONFIG.mysql_host_,
  user:CONFIG.mysql_user_,
  port:CONFIG.mysql_port_,
  password:CONFIG.mysql_password_,
  database:'lj_mp'
})
var Pool2 = mysql.createPool({
  host:CONFIG.mysql_host,
  user:CONFIG.mysql_user,
  port:CONFIG.mysql_port,
  password:CONFIG.mysql_password,
  database:'lj_node'
})
var Pool3 = mysql.createPool({
  host:CONFIG.mysql_host,
  user:CONFIG.mysql_user,
  port:CONFIG.mysql_port,
  password:CONFIG.mysql_password,
  database:'classmate'
})
global.CON = function(sql,val,callback){
  Pool1.getConnection(function(err,conn){
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
global.CONN = function(sql,val,callback){
  Pool2.getConnection(function(err,conn){
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
global.CONNN = function(sql,val,callback){
  Pool3.getConnection(function(err,conn){
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
global.WX_IDReunion = function(code,callback){
  var appid = CONFIG.reunion_appid;
  var secret = CONFIG.reunion_secret;
  var infoUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code';
  request.get(infoUrl,function(err,response,result){
    if(err){
      //throw Error(err)
      LOG(err)
    }else{
      callback(result)
    }
  })
}

module.exports = app;
