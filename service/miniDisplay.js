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
 * 获取unionid
 */
this.getUnionIdByCode = function(params,callback){
    const { code } = params
    new Promise((resolve,reject) => {
        if(!code){
            reject(errorMapper.lackParams)
        }else{
            const url = 'https://api.weixin.qq.com/sns/jscode2session?appid='+APPID+'&secret='+SECRET+'&js_code='+code+'&grant_type=authorization_code';
            request.get(url,(err,Response,body) =>{
                body = typeof(body) == 'object' ? body : JSON.parse(body);
                if(body.unionid){
                    resolve({
                        code: 200,
                        msg: '获取成功',
                        data: body.unionid
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

/**
 * 
 */
this.checkUserByUnionId = function(params,callback){
    const { unionid } = params
    Vip_basic.findOne({
        where:{
            unionid
        }
    }).then(result => {
        callback({
            code:200,
            msg:'',
            data:result
        })
    })
}

/**
 * 获取vip-basic
 */
this.getAllVipBasic = function(params,callback){
    let { unionid, page, pageSize } = params;
    page = page ? Number(page) : 1;
    pageSize = pageSize ? Number(pageSize) : 20
    Vip_basic.findAll({
        where:{
            checked:1
        },
        offset:(page - 1)*pageSize,
        limit:pageSize
    }).then(result => {
        callback({
            code:200,
            msg:'',
            data:result
        })
    }).catch(e => {throw e})
}

/**
 * 通过unionid获取用户信息
 */
this.getUserInfoByUnionId = (params,callback) =>{
    const { unionid } = params;
    new Promise((resolve,reject) => {
        if(!unionid){
            reject(errorMapper.lackParams)
        }else{
            resolve()
        }
    }).then(() => {
       return Vip_basic.findOne({
            where:{
                unionid,
                checked:1
            }
        }).then(result => {
            callback({
                code:200,
                msg:'',
                data:result
            })
        }).catch(e => {throw e})
    }).catch(e => callback(responseError(e)))
}

/**
 * 检查是否为组委会成员
 */
this.checkOrganizer = (params,callback) => {
    const { unionid } = params;
    new Promise((resolve,reject) => {
        if(!unionid){
            reject(errorMapper.lackParams)
        }else{
            resolve()
        }
    }).then(() => {
        return Organizer.findOne({
            where:{
                unionid,
                isdel:0
            }
        }).then(result => {
            if(result){
                callback({
                    code:200,
                    msg:'是组委会成员',
                    data:result
                })
            }else{
                callback(errorMapper.notOrganizer)
            }
        }).catch(e => {throw e})
    }).catch(e => callback(responseError(e)))
}

/**
 * 添加组委会成员
 */
this.addOrganizer = (params,callback) => {
    let { organizerArr } = params
    organizerArr = typeof(organizerArr) == 'object' ? organizerArr : JSON.parse(organizerArr);
    const _p = []
    organizerArr.forEach((items,index) => {
        _p[index] = new Promise((resolve,reject) => {
            const { unionid } = items
            if(!unionid){
                reject(errorMapper.lackParams)
            }else{
                return Organizer.findOne({
                    where:{
                        unionid,
                        isdel:0
                    }
                }).then(result => {
                    if(result){
                        resolve()
                    }else{
                        //歧义基本表数据还是临时表数据
                        return Vip_basic.findOne({
                            where:{
                                unionid,
                                checked:1
                            }
                        }).then(val => {
                            if(val){
                                return Organizer.create({
                                    unionid,
                                    user_name:val.dataValues.name
                                }).then(result => {
                                    resolve()
                                }).catch(e => {throw e})
                            }else{
                                reject(errorMapper.noUser)
                            }
                        }).catch(e => reject(e))
                    }
                }).catch(e => {throw e})
            }
        })
    });
    return Promise.all(_p).then(() => {
        callback({
            code:200,
            msg:'新增成功',
            data:[]
        })
    }).catch(e => callback(responseError(e)))
}

/**
 * 移除组委会成员
 */
this.removeOrganizer = (params,callback) => {
    const { removeUnionId } = params
    new Promise((resolve,reject) => {
        if(!removeUnionId){
            reject(errorMapper.lackParams)
        }else{
            resolve()
        }
    }).then(() => {
        return Organizer.update({
            isdel:1
        },{
            where:{
                unionid:removeUnionId
            }
        }).then(result => {
            callback({
                code:200,
                msg:'删除成功',
                data:result
            })
        }).catch(e => {throw e})
    }).catch(e => callback(responseError(e)))
}