const request = require('request');
const Vip_basic = require('../dao').Vip_basic;
const Apply = require('../dao').Apply;
const Organizer = require('../dao').Organizer;

const APPID = 'wx238ca91cc7a15764';
const SECRET = '17bc3bcd68b4bef8cde7e56a0b9a6e48';

/**
 * 生成异常对象
 * 工厂模式
 */
const createError = (obj) => {
    const error =  new Error(obj.msg);
    error.code = obj.code;
    return error;
}

/**
 * 异常返回处理
 * @param {object} e 
 */
const responseError = (e) => {
    if(!e.code) e.code = -1;
    if(!e.data) e.data = [];
    if(e.code==-1) LOG(e);
    return {
        code: e.code,
        msg: e.message ? e.message : e.msg,
        data: e.data
    };
}

/**
 * 异常map
 */
const errorMapper = {
    lackParams:{
        code:-12001,
        msg:'缺少参数'
    },
    notOrganizer:{
        code:-12002,
        msg:'不是组委会成员'
    },
    noUser:{
        code:-12003,
        msg:'无此用户'
    }
}


/**
 * 获取openid
 */
this.getOpenIdByCode = function(params,callback){
    const { code } = params
    new Promise((resolve,reject) => {
        if(!code){
            reject(errorMapper.lackParams)
        }else{
            const url = 'https://api.weixin.qq.com/sns/jscode2session?appid='+APPID+'&secret='+SECRET+'&js_code='+code+'&grant_type=authorization_code';
            request.get(url,(err,Response,body) =>{
                body = typeof(body) == 'object' ? body : JSON.parse(body);
                if(body.openid){
                    resolve({
                        code: 200,
                        msg: '获取成功',
                        data: body.openid
                    });
                }else{
                    resolve({
                        code: -1,
                        msg: body.errmsg,
                        data: []
                    });
                }
            })
        }
    }).then(result =>{
        callback(result)
    }).catch(e =>{callback(responseError(e))})
}

this.sendUserName = function(params,callback){
    const { form_id } = params
    new Promise((resolve,reject) => {
        var getAccessTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+APPID+'&secret='+SECRET;
        request.get(getAccessTokenUrl,(err,Response,body) => {
            body = typeof(body) == 'object' ? body : JSON.parse(body);
            if(body.access_token){
                resolve(body.access_token)
            }else{
                reject(body.errmsg)
            }
        })
    }).then(value => {
     //   console.log(value)
        const ACCESS_TOKEN = value
        var templateMsgUrl = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='+ACCESS_TOKEN;
        let data = {
            touser:'oX4n945b-6hWoU3X35AvZk8ejD0c',
            template_id:'bCPEvJkwhFE2Ae6_dkY3k7eFnZgxuNa4Qh1HKegY7P8',
            form_id:form_id
        }
        let options = {
            url:templateMsgUrl,
            method:'POST',
            header:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }
        request(options,(err,Response,res)=> {
            if(err){
                console.log(err)
            }else{
                console.log(res)
                callback(res)
            }
        })
    })
}