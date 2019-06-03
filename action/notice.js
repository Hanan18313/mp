var ServiceNotice = require('../service/notice.js')
var url = require('url')
var crypto = require('crypto')
var request = require('request')

this.getSignName = (req,res,next) => {
    var params = url.parse(req.url,true).query
    //console.log(params)
    const token = 'langjie';
    const signature = params.signature;
    const echostr = params.echostr;
    const timestamp = params.timestamp;
    const nonce = params.nonce;
    let array = [timestamp,nonce,token].sort().join('')
    const sha1 = crypto.createHash("sha1")
    sha1.update(array);
    const str = sha1.digest('hex')
    res.send(echostr)
    console.log(token)
    if(str == signature){
        return true
    }else{
        return false
    }
}
this.getOpenIdByCode = function(req,res,next){
    const params = url.parse(req.url,true).query
    ServiceNotice.getOpenIdByCode(params,result => {
        res.send(result)
    })
}
this.sendUserName = function(req,res,next){
    const params = req.body;
    ServiceNotice.sendUserName(params,result => {
        res.send(result)
    })
}
this.uniFormMsgSend = function(req,res,next){
    const params = req.body
    ServiceNotice.uniFormMsgSend(params,result => {
        res.send(result)
    })
}
this.operationRedis = function(req,res,next){
    const params = {}
    ServiceNotice.operationRedis(params,result => {
        res.send(result)
    })
}

this.apply = function(req,res,next){
    const params = {}
    ServiceNotice.apply(params,result => {
        res.send('111')
    })
}
this.getMoreData = (req,res,next) => {
    const params = {}
    ServiceNotice.getMoreData(params,result => {
        res.send(result)
    })
}

/**
 * 获取token
 */
this.getAccessToken = function(req,res,next){
    const params = {}
    ServiceNotice.getAccessToken(params,result => {
        res.send(result)
    })
}

/**
 * 获取素材list
 */
this.getMaterialList = function(req,res,next){
    const params = {}
    params.access_token = req.headers['access_token'],
    params.offset = req.headers['offset'],
    params.type = req.headers['type'],
    params.count = req.headers['count']
    ServiceNotice.getMaterialList(params,result => {
        res.send(result)
    })
}
//获取评论信息
this.getCommentList = function(req,res,next){
    const params = {}
    params.access_token = req.headers['access_token'],
    params.msg_data_id = req.headers['msg_data_id'],
    params.begin = req.headers['begin'],
    params.count = req.headers['count'],
    params.type = req.headers['type']
    ServiceNotice.getCommentList(params,result => {
        res.send(result)
    })
}

/**
 * 图文消息群发
 */
this.messageMassSend = function(req,res,next){
    const params = {}
    params.access_token = req.headers['access_token']
    ServiceNotice.messageMassSend(params,result => {
        res.send(result)
    })
}


/**
 * 打开留言功能
 */
this.commentOpen = function(req,res,next){
    const params = req.body
    params.access_token = req.headers['access_token']
    ServiceNotice.commentOpen(params,result => {
        res.send(result)
    })
}

/**
 * 关闭留言功能
 */
this.commentClose = function(req,res,next){
    const params = req.body
    params.access_token = req.headers['access_token']
    console.log(params)
    ServiceNotice.commentClose(params,result => {
        res.send(result)
    })
}


/**
 * 群发 还剩一次机会
 */
this.materialSendAll = function(req,res,next){
    const params = {}
    ServiceNotice.materialSendAll(params,result => {
        res.send(result)
    })
}





/**
 * 获取网络时间
 */
this.getNetTime = function(req,res,next){
    const params = {}
    ServiceNotice.getNetTime(params,result => {
        res.send(result)
    })
}

/**
 * 获取容器中的数据
 */
this.getDockerData = function(req,res,next){
    const params = {}
    ServiceNotice.getDockerData(params,result => {
        res.send(result)
    })
}