var actionNotice = require('../action/notice.js')

module.exports = function(app){
    app.get('/',function(req,res,next){
        actionNotice.getSignName(req,res,next)
    })
    app.get('/getOpenIdByCode',function(req,res,next){
        actionNotice.getOpenIdByCode(req,res,next)
    })
    app.post('/sendUserName',function(req,res,next){
        actionNotice.sendUserName(req,res,next)
    })
    app.post('/uniFormMsgSend',function(req,res,next){
        actionNotice.uniFormMsgSend(req,res,next)
    })
    app.post('/operationRedis',function(req,res,next){
        actionNotice.operationRedis(req,res,next)
    })
    app.get('/apply',function(req,res,next){
        actionNotice.apply(req,res,next)
    })
    app.get('/getMoreData',function(req,res,next){
        actionNotice.getMoreData(req,res,next)
    })
    //获取token
    app.get('/getAccessToken',function(req,res,next){
        actionNotice.getAccessToken(req,res,next)
    })
    app.get('/getMaterialList',function(req,res,next){
        actionNotice.getMaterialList(req,res,next)
    })
    app.get('/getCommentList',function(req,res,next){
        actionNotice.getCommentList(req,res,next)
    })
    app.post('/messageMassSend',function(req,res,next){
        actionNotice.messageMassSend(req,res,next)
    })
    app.post('/material/sendAll',function(req,res,next){
        actionNotice.materialSendAll(req,res,next)
    })
    app.post('/commentClose',function(req,res,next){
        actionNotice.commentClose(req,res,next)
    })
    app.post('/commentOpen',function(req,res,next){
        actionNotice.commentOpen(req,res,next)
    })



    //获取网络时间
    app.get('/getNetTime',function(req,res,next){
        actionNotice.getNetTime(req,res,next)
    })
}