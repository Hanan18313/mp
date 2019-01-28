var Mod_common = require('../model/common.js')
var base = require('./base.js')
var url = require('url')
var MD5 = require('md5')

this.login = function(req,res){
    var user = req.body.user_name
    var password = req.body.password;
    Mod_common.login(user,function(result){
        if(result.length != 0){
            if(MD5(password)== result[0].pwd){
                res.send({
                    code:200,
                    msg:'登陆成功',
                    data:true
                })
            }else{
                res.send({
                    code:200,
                    msg:'登陆失败',
                    data:false
                })
            }
        }else{
            res.send({
                code:200,
                msg:'登陆失败',
                data:false
            })
        }

    })
}

this.mp_list = function(req,res){
    var query = url.parse(req.url,true).query
    var page = query.page?Number(query.page):1
    var pageSize = query.pageSize?Number(query.pageSize):10
    var resultArr = []
    Mod_common.mp_list(page,pageSize,function(result){
        for(let i = 0; i < result.length; i++){
            result[i].date = base.formatDate(result[0].date)
        }
        resultArr.push(result)
        res.send(resultArr[0])
    })
}
this.mp_create = function(req,res){
    var params = req.body.value
    var obj = {}
}
this.mp_info = function(req,res){
    var mp_id = url.parse(req.url,true).query.mp_id
    Mod_common.mp_info(mp_id,function(result){
        res.send(result)
    })
}
this.edit_mp = function(req,res){
    var params = req.body
    var obj = {
        mp_id:params.mp_id,
        secret:params.secret,
        e_mail:params.e_mail,
        pwd:params.pwd,
        note:params.note
    }
    Mod_common.edit_mp(obj,function(result){
        res.send({
            code:200,
            msg:'更新成功'
        })
    })
}