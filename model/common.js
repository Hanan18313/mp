
this.login = function(user,callback){
    let str = 'SELECT * FROM employee WHERE user_id = "'+user+'" OR user_name = "'+user+'"'
    CONN(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.mp_list = function(page,pageSize,callback){
    let starPage = Number((page-1)*pageSize)
    let str = 'SELECT * FROM mp_info limit '+starPage+','+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.mp_info = function(mp_id,callback){
    let str = 'SELECT * FROM mp_info WHERE mp_id = "'+mp_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.edit_mp = function(obj,callback){
    let str = 'UPDATE mp_info SET app_secret = "'+obj.secret+'", e_mail = "'+obj.e_mail+'", pwd = "'+obj.pwd+'", note = "'+obj.note+'" WHERE mp_id = "'+obj.mp_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}