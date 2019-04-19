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
}