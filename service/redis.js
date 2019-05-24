var redis = require('redis');
var client = redis.createClient()

/**
 * 生成异常对象
 * 工厂模式
 */
const createError = function(){
    const error = new Error(obj.msg);
    error.code = obj.code;
    return error
}

/**
 * 异常返回处理
 */
const responseError = function(e){
    if(!e.code) e.code = -1;
    if(!e.data) e.data = [];
    if(e.code == -1) LOG(e);
    return {
        code: e.code,
        msg: e.message,
        data: e.data
    }
}
/**
 * 异常map
 */
const errorMapper = {
    lackParams: {
        code:-12001,
        msg:'缺少参数'
    }
}

client.on('ready',() =>{
    console.log('redis connect success')
})

/**
 * 将formId存入内存，设置7天失效,存放一个，SET时更新最新。
 */

this.formIdSaveToRedis = function(params,callback){
   // console.log(params)
    const { openid, form_id } = params;
    new Promise((resolve,reject) => {
        if(!openid || !form_id){
            reject(errorMapper.lackParams)
        }else{
            resolve()
        }
    }).then(() => {
        client.SET(openid,form_id,"EX",76400,(err,reply) => {
            callback(reply)
        })
        client.TTL(openid,(err,reply) => {
            console.log(reply)
        })
    })
}

/**
 * 声明一个formId
 */
class FormId{
    constructor(form_id){
        this.form_id = form_id
    }
    
}


