var url = require('url')
var Mod_reunion = require('../model/reunion.js')
var base = require('./base_class')
var Promise = require('promise')
var request = require('request')


const APPID = 'wx1bff49ece2b88778', SECRET = '6a2f68b101217a3ce73de6939cb70df7';

/**
 * 
 * 异常对象
 * 工厂模式
 * 
 */

 const createError = (obj) => {
     const error = new Error(obj.msg);
     error.code = obj.code
     return error
 }


 /**
  * 异常返回
  * 
  */

  const responseError = (e) => {
      if(!e.code) e.code = -1;
      if(!e.data) e.data = [];
      if(e.code == -1) LOG(e);
      return {
          code:e.code,
          msg:e.message ? e.message : e.msg,
          data: e.data
      };
  }
  /**
   * 
   * 异常map
   * 
   */

   const errorMapper = {
       lackParams: {
           code:-12001,
           msg:'缺少参数'
       }
   }


   /***
    * websocket
    * 
    */



   //获取Openid
this.getOpenIdByCode = function(req,res,next){
    const code = url.parse(req.url,true).query.code;
    new Promise((resolve,reject) => {
        if(!code){
            reject(errorMapper.lackParams)
        }else{
            const url = 'https://api.weixin.qq.com/sns/jscode2session?appid='+APPID+'&secret='+SECRET+'&js_code='+code+'&grant_type=authorization_code';
            request.get(url,(err,res,body) => {
                body = typeof(body) == 'object' ? body : JSON.parse(body)
                if(body){
                    resolve({
                        code:200,
                        msg:'获取成功',
                        data:body.openid
                    })
                }else{
                    resolve({
                        code:-1,
                        msg:body.errmsg,
                        data:[]
                    })
                }
            })
        }
    }).then(result => {
        res.send(result)
    }).catch(e => {
        LOG(responseError(e))
    })
}
//检查header 合法性

this.checkHeader = (req,res,next) => {
    const openid = req.headers['openid'];
    if(openid){
        Mod_reunion.checkIsUser(openid,function(result){
            if(result){
                next()
            }else{
                res.status(401)
                res.send({
                    code:401,
                    msg:'非法用户',
                    data:[]
                })
            }
        })
    }else{
        res.status(401);
        res.send({
            code:401,
            msg:'身份过期',
            data:[]
        })
    }
}
//通过openid获取用户信息
this.getUserInfoByOpenId = function(req,res,next){
    var openid = req.headers['openid']
    Mod_reunion.getUserInfoByOpenId(openid,function(result){
        res.send({
            code:200,
            msg:'',
            data:result
        })
    })
}
this.uploadImgForMeetingNews = function(req,res,next){
    var openid = req.headers['openid']
    Mod_reunion.checkIsUser(openid,function(result){
        if(result){
            const mulUploadImg = new base.MulUploadImg('/public/images/mp');
            mulUploadImg.upload(req,(name,fields) => {
                res.send({
                    code: 200,
                    msg: '上传成功',
                    data: ['/img/mp/'+name]
                });
                mulUploadImg.resize();
            });
        }else{
            res.send({
                code:401,
                msg:'非法用户',
                data:[]
            })
        }
    })
}