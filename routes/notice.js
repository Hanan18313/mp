var actionNotice = require('../action/notice.js')

module.exports = function(app){
    app.get('/getSignName',function(req,res,next){
        actionNotice.getSignName(req,res,next)
    })
}