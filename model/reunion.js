
this.checkIsUser = function(openid,callback){
    let str = 'SELECT * FROM user WHERE Open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.getUserInfoByOpenId = function(openid,callback){
    let str = 'SELECT * FROM user WHERE Open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}