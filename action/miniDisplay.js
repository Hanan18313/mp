const url = require('url')
const fs = require('fs')
const request = require('request')
const serviceMiniDisplay = require('../service/miniDisplay.js')


this.getUnionIdByCode = function(req,res,next){
    const params = url.parse(req.url,true).query
    serviceMiniDisplay.getUnionIdByCode(params,result => {
        res.send(result)
    })
}

/**
 * 检查头信息合法
 */
this.checkHeader = (req,res,next) => {
    // req.headers['openid'] = 123321;
    const unionid = req.headers['unionid'];
    if(unionid){
        serviceMiniDisplay.checkUserByUnionId({
            unionid
        },result => {
            if(result.code==200){
                next();
            }else{
                res.status(401);
                res.send({
                    code: 401,
                    msg: '非法用户',
                    data: []
                });
            }
        });
    }else{
        res.status(401);
		res.send({
			code: 401,
			msg: '身份过期',
			data: []
		});
    }
}
/**
 * 获取vip_basic
 */
this.getAllVipBasic = function(req,res,next){
    const params = url.parse(req.url,true).query
    params.unionid = req.headers['unionid']
    serviceMiniDisplay.checkOrganizer(params,result => {
        if(result.code == 200){
            serviceMiniDisplay.getAllVipBasic(params,result => {
                res.send(result)
            })
        }else{
            res.send(result)
        }
    })
}

/**
 * 通过unionid获取会员信息
 */
this.getUserInfoByUnionId = (req,res,next) =>{
    const params = {}
    params.unionid = req.headers['unionid'];
    serviceMiniDisplay.getUserInfoByUnionId(params,result =>{
        res.send(result)
    }) 
}

/**
 * 检查是否为组委会成员
 */
this.checkOrganizer = (req,res,next) => {
    const params = {};
    params.unionid = req.headers['unionid'];
    serviceMiniDisplay.checkOrganizer(params,result => {
        res.send(result)
    })
}


/**
 * 新增组委会成员
 */
this.addOrganizer = (req,res,next) => {
    const params = req.body;
    params.unionid= req.headers['unionid'];
    serviceMiniDisplay.checkOrganizer(params,result =>{
        if(result.code == 200){
            serviceMiniDisplay.addOrganizer(params,result =>{
                res.send(result)
            })
        }else{
            res.send(result)
        }
    })
}
/**
 * 移除组委会成员
 */
this.removeOrganizer = (req,res,next) => {
    const params = req.body
    params.unionid = req.headers['unionid']
    serviceMiniDisplay.checkOrganizer(params,result => {
        if(result.code == 200){
            serviceMiniDisplay.removeOrganizer(params,result => {
                res.send(result)
            })
        }else{
            res.send(result)
        }
    })
}