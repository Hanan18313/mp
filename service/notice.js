const request = require('request');
const Vip_basic = require('../dao').Vip_basic;
const Apply = require('../dao').Apply;
const Organizer = require('../dao').Organizer;
const serverRedis = require('../service/redis.js');
const Base = require('./base.js')
const nettime = require('nettime')
var redis = require('redis')
var client = redis.createClient();
var Common = require('./common.js')

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
    const { form_id } = params;
    params.openid = '456'
    serverRedis.formIdSaveToRedis(params,result => {
        console.log(result)
    })
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
        console.log(form_id)
        const ACCESS_TOKEN = value
        var templateMsgUrl = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='+ACCESS_TOKEN;
        let data = {
            touser:'oX4n945b-6hWoU3X35AvZk8ejD0c',
            template_id:'bCPEvJkwhFE2Ae6_dkY3k7eFnZgxuNa4Qh1HKegY7P8',//小程序模板消息id
            form_id:'fb73413e0ead42f4b33d300efa0b0a84',
            page:'index',
            data:{
                "keyword1":{
                    "value":"伪装formid测试"
                },
                "keyword2": {
                    "value": "2015年01月05日 12:30"
                },
                "keyword3": {
                    "value": "腾讯微信总部"
                },
                "keyword4": {
                    "value": "广州市海珠区新港中路397号"
                }
            }
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

this.uniFormMsgSend = function(params,callback){
    const {} = params
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
        const ACCESS_TOKEN = value
        var uniFormMsgUrl = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/uniform_send?access_token='+ACCESS_TOKEN;
        let data = {
            touser:'oX4n943MkonOhZYXgb9adpLmuVAM',//oX4n943MkonOhZYXgb9adpLmuVAM  ...oX4n945b-6hWoU3X35AvZk8ejD0c
            mp_template_msg:{
                appid:'wx0f012ab2b8db902d',//微信公众号appid
                template_id:"E5B8TO-GTo-l2X7364aZriFnU1XIBIFau04FajNTlOI",//模板消息id
                url:'www.langjie.com',
                miniprogram:{
                    appid:'wxd984f4aa68d4a52e',//wx1bff49ece2b88778,wx238ca91cc7a15764
                    path:'index?foo=bar'
                },
                data:{
                    "keyword1": {
                        "value": "杭州朗杰测控技术开发有限公司"
                    },
                    "keyword2": {
                        "value": "待定"
                    },
                    "keyword3": {
                        "value": "待定"
                    },
                    "keyword4": {
                        "value": "待定"
                    }
                }
            }
        };
        let options = {
            url:uniFormMsgUrl,
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
               // console.log(res)
                callback(res)
            }
        })
    })
}



/************************微信图文消息*****************************************/

this.getAccessToken = function(params,callback){
    let getAccessTokenUrl = 'https://wx.langjie.com/wx/getToken';
    new Promise((resolve,reject) => {
        request.get(getAccessTokenUrl,(err,Response,body) => {
            console.log(body)
            body = typeof(body) == 'object' ? body : JSON.parse(body);
            if(body.access_token){
                resolve(body.access_token)
            }else{
                reject(body.errmsg)
            }
        })
    }).then(val => {
        callback({
            code:200,
            msg:'',
            data:val
        })
    })
}

this.getMaterialList = function(params,callback){
    const { access_token, type, offset, count } = params
    const getMaterialListUrl = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token='+access_token;
    const param = {
        type:type,
        offset:offset,
        count:count
    }
    const options = {
        url:getMaterialListUrl,
        method:'POST',
        header:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(param)
    }
    request(options,(err,Response,res)=> {
        if(err){
            console.log(err)
        }else{
            callback(res)
            //callback(JSON.parse(res))
        }
    })
}

/**
 * 获取图文评论信息
 */
this.getCommentList = function(params,callback){
    const { access_token, msg_data_id, begin, count, type } = params
    const param = {
        msg_data_id:msg_data_id,
        begin:begin,
        count:count,
        type:type
    }
    const getCommentListUrl = 'https://api.weixin.qq.com/cgi-bin/comment/list?access_token='+access_token;
    const options = {
        url:getCommentListUrl,
        method:'POST',
        header:{
            'content-type':'application/json'
        },
        body:JSON.stringify(param)
    }
    request(options,(err,Response,body) => {
        body = typeof(body) == 'object' ? body : JSON.parse(body)
        if(body.errcode == 0){
            callback({
                code:200,
                msg:'',
                data:body
            })
        }else{
            callback(body)
        }
    })
}


/**
 * 打开留言功能
 */
this.commentOpen = function(params,callback){
    const { access_token, msg_data_id } = params
    const commentOpenUrl = 'https://api.weixin.qq.com/cgi-bin/comment/open?access_token='+access_token
    const param = {
        msg_data_id:msg_data_id
    }
    const options = {
        url:commentOpenUrl,
        method:"POST",
        header:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(param)
    }
    request(options,(err,Response,body) => {
        if(err){
            console.log(err)
        }else{
            callback(body)
        }
    })
}

/**
 * 关闭留言功能
 */
this.commentClose = function(params,callback){
    const { access_token, msg_data_id } = params
    const commentCloseUrl = 'https://api.weixin.qq.com/cgi-bin/comment/close?access_token='+access_token;
    const param = {
        msg_data_id:msg_data_id
    };
    const options = {
        url:commentCloseUrl,
        method:"POST",
        header:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(param)
    }
    request(options,(err,Response,body) => {
        if(err){
            console.log(err)
        }else{
            callback(body)
        }
    })
}




/**
 * 图文消息群发
 */
this.messageMassSend = function(params,callback){
    const { access_token } = params
    const messageMassSendUrl = 'https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token='+access_token;
    const param = {
        touser:['oxIzxsi5fWmGK-WfFP1Mpx-x7AjU','oxIzxsszYtz1i-Bf6oR86jRQE1pQ'],
        mpnews:{
            media_id:'yF6dlw_1E--yVRDlVtuXZkm0MIZygxOhL7rPDo47k_0'//yF6dlw_1E--yVRDlVtuXZind5f7c07dMn86EN-3gV1s
        },
        msgtype:'mpnews',
        send_ignore_reprint:0
    };
    const options = {
        url:messageMassSendUrl,
        method:'POST',
        header:{
            'content-type':'application/json'
        },
        body:JSON.stringify(param)
    };
    request(options,(err,Response,body) => {
        body = typeof(body) == 'object' ? body : JSON.parse(body)
        callback(body)
    })
}





/**
 * 获取网络时间
 */
this.getNetTime = function(params,callback){
    const url = 'http://www.ntsc.ac.cn';
    request.get(url,(err,result) => {
        if(err){
            console.log(err)
        }else{
            callback(result)
        }
    })
}

/**
 * 获取容器中的数据
 */
this.getDockerData = function(params,callback){
    Vip_basic.findAll({
        where:{
            checked:1
        }
    }).then(result => {
        callback({
            code:200,
            msg:'',
            data:result
        })
    }).catch(e => {throw e})
}
