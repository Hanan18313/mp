var express = require('express')
var actionMiniDisplay = require('../action/miniDisplay.js')

module.exports = function(app){
    app.options('/mp/*', function(req,res,next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Expose-Headers', 'openId,Content-Type');
		res.header("Access-Control-Allow-Headers", 'openId,Content-Type');
		res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,DELETE,OPTIONS');
		res.send('200');
    });
    app.get('/mp/getUnionIdByCode',function(req,res,next){
        actionMiniDisplay.getUnionIdByCode(req,res,next)
    })
    app.use('/mp', function(req,res,next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Expose-Headers', 'openId,Content-Type');
		res.header("Access-Control-Allow-Headers", 'openId,Content-Type');
        res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,DELETE,OPTIONS');
        actionMiniDisplay.checkHeader(req,res,next);
    });
    
    //获取会员list
    app.get('/mp/getAllVipBasic',function(req,res,next){
        actionMiniDisplay.getAllVipBasic(req,res,next)
    })
    //通过unionid获取会员信息
    app.get('/mp/getUserInfoByUnionId',function(req,res,next){
        actionMiniDisplay.getUserInfoByUnionId(req,res,next)
    })

    //检查是否为组委会成员
    app.get('/mp/checkOrganizer',function(req,res,next){
        actionMiniDisplay.checkOrganizer(req,res,next)
    })

    //新增组委会成员
    app.post('/mp/addOrganizer',function(req,res,next){
        actionMiniDisplay.addOrganizer(req,res,next)
    })

    //移除组委会成员
    app.delete('/mp/removeOrganizer',function(req,res,next){
        actionMiniDisplay.removeOrganizer(req,res,next)
    })
}