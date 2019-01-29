var url = require('url')
var Mod_reunion = require('../model/reunion.js')
var Base = require('./base.js')
var Promise = require('promise')

this.userInfo = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_reunion.userInfo(openid,function(result){
        if(result.length > 0){
            if(result[0].clbum == 1){
                result[0].clbum = '一班'
            }else if(result[0].clbum == 2){
                result[0].clbum = '二班'
            }else if(result[0].clbum == 3){
                result[0].clbum = '三班'
            }
            res.send(result)
        }else{
            res.send(result)
        }
        
    })
}
this.apply = function(req,res){
    var query = req.body
        name = query.name
        openid = query.openid
        portrait = query.avatarUrl
    Mod_reunion.apply(name,function(result){
        if(result.length == 1){
            if(result[0].open_id.length == 0){
                Mod_reunion.apply_openid(name,openid,portrait,function(result){
                    res.send({
                        code:201,
                        msg:'更新成功'
                    })
                })
            }else{
                res.send({
                    code:400,
                    msg:'名字已被占用'
                })
            }
        }else{
            res.send({
                code:200,
                msg:'暂无数据'
            })
        }
    })
}
this.capture_apply = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_reunion.capture_apply(openid,function(result){
        res.send(result)
    })
}
this.complain = function(req,res){
    var params = req.body.obj
    var openid = params.openid
    var obj = {
        name:params.name,
        phone:params.phone,
        status:2,
        time:Base.now_time(),
        openid:params.openid,
        portrait:params.avatarUrl
    }
    Mod_reunion.capture_complain(openid,function(result){
        if(result.length == 0){
            Mod_reunion.complain(obj,function(result){
                res.send({
                    code:200,
                    msg:'申诉中'
                })
            })
        }else{
            Mod_reunion.complain_sec(obj,function(result){
                res.send({
                    code:200,
                    msg:'申诉中'
                })
            })
        }
    })
}
this.capture_complain = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_reunion.capture_complain(openid,function(result){
        res.send(result)
    })
}
this.meeting_info = function(req,res){
    Mod_reunion.meeting_info(function(result){
        if(result.length > 0){
            result[0].start_time = Base.formatDate(result[0].start_time)
            result[0].end_time = Base.formatDate(result[0].end_time)
        }
        res.send(result)
    })
}
this.completed = function(req,res){//获取@个人数据源
    var user_name = url.parse(req.url,true).query.user_name
    Mod_reunion.completed(user_name,function(result){
        res.send(result)
    })
}
this.news = function(req,res){
    Mod_reunion.news(function(res_news){
        Mod_reunion.top_news(function(res_top){
            new Promise((resolve,reject) =>{
                resolve()
            }).then(() =>{
                for(let i = 0; i < res_news.length; i++){
                    res_news[i].news_time = Base.formatDate(res_news[i].news_time)
                }
            }).then(() =>{
                res_top[0].news_time = Base.formatDate(res_top[0].news_time)
                res.send({
                    news:res_news,
                    top_news:res_top
                })
            })
        })
    })
}
this.more_news = function(req,res){
    var top_news = []
    var imp_news = []
    var query = url.parse(req.url,true).query
    var page = query.page?Number(query.page):1
    var pageSize = query.pageSize?Number(query.pageSize):20
    Mod_reunion.more_news(page,pageSize,function(result){
        new Promise((resolve,reject) =>{
            resolve()
        }).then(() =>{
            for(let i = 0; i < result.length; i++){
                result[i].news_time = Base.formatDate(result[i].news_time)
                if(result[i].is_top == 1){
                    top_news.push(result[i])  
                }else{
                    imp_news.push(result[i])
                }
            }
        }).then(() =>{
            res.send({
                top_news:top_news,
                imp_news:imp_news
            })
        })
    })
}
this.signIn = function(req,res){
    var openid = req.body.openid
    var avatarUrl = req.body.avatarUrl
    Mod_reunion.userInfo(openid,function(result){
        if(result){
            new Promise((resolve,reject) =>{
                resolve()
            }).then(() =>{
                for(let i in result[0]){
                    if(result[0][i] == null){
                        result[0][i] = ''
                    }
                }
            }).then(() =>{
                Mod_reunion.check_reunion(openid,function(check_res){
                    if(check_res.length == 0){
                        var obj = {
                            name:result[0].user_name,
                            stu_id:result[0].stu_id,
                            clbum:result[0].clbum,
                            department:result[0].department,
                            major:result[0].major,
                            mobile:result[0].mobile,
                            e_mail:result[0].e_mail,
                            social_account:result[0].social_account,
                            company:result[0].company,
                            resident:result[0].resident,
                            addr1:result[0].addr1,
                            addr2:result[0].addr2,
                            openid:openid,
                            portrait:avatarUrl,
                            status:2,
                            time:Base.now_time()
                        }
                        Mod_reunion.signIn(obj,function(result){
                            Mod_reunion.create_affairs(obj,function(result){
                                res.send({
                                    code:200,
                                    msg:'报名成功'
                                })
                            })
                        })
                    }
                })
            })
        }else{
            res.send({
                code:404,
                msg:'暂无信息'
            })
        }
    })
}
this.audit_signIn = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    var ranking = []
    Mod_reunion.audit_signIn(openid,function(result){
        Mod_reunion.ranking(function(ranking_val){
            new Promise((resolve,reject) =>{
                resolve()
            }).then(() =>{
                for(let i = 0; i < ranking_val.length; i++){
                    ranking.push(ranking_val[i].open_id)
                }
            }).then(() =>{
                res.send({
                    result:result,
                    ranking:ranking.indexOf(openid)+1,
                    total:ranking.length
                })
            })
        })
    })
}
this.renewal_userInfo = function(req,res){
    var region = ['中国','美国','加拿大','澳洲','日本','欧洲','港澳台'];
    var obj = req.body.obj
    var Obj = {
        department:obj.department,
        major:obj.major,
        addr1:obj.addr1,
        addr2:obj.addr2,
        mobile:obj.mobile,
        e_mail:obj.e_mail,
        social_account:obj.social_account,
        company:obj.company,
        openid:obj.openid,
        resident:region[obj.resident]
    }
    Mod_reunion.renewal_userInfo(Obj,function(result){
        res.send({
            code:200,
            msg:'用户信息更新成功'
        })
    })
}
this.committee = function(req,res){
    var open_id = url.parse(req.url,true).query.openid
    var openidArr = []
    var bool
    Mod_reunion.committee(function(result){
        if(result.length > 0){
            openidArr = result[0].group_openid.split(",")
            var found = openidArr.find(function(element) {
                return element == open_id;
            });
            if(found){
                res.send({
                    code:200,
                    val:1
                })
            }else{
                res.send({
                    code:200,
                    val:0
                })
            }
            // new Promise((resolve,reject) =>{
            //     var found = openidArr.find(function(element) {
            //         return element == open_id;
            //       });
            //     console.log(found)
            //     // for(let i = 0; i < openidArr.length; i++){
            //     //     if(open_id == openidArr[i]){
            //     //         bool = 1
            //     //         resolve(bool)
            //     //     }else{
            //     //         resolve()
            //     //     }
            //     // }
            // }).then((val) =>{
            //     res.send({
            //         code:200,
            //         val:val,
            //     })
            // }).catch(e =>{
            //     LOG(e)
            // })
        }else{
            res.send({
                code:200,
                val:0
            })
        }
    })
}
this.committee_info = function(req,res){
    var openidArr = []
    var member_arr = []
    var _p = []
    new Promise((resolve,reject) =>{
        Mod_reunion.committee(function(result){
            if(result.length > 0){
                openidArr = result[0].group_openid.split(",")
                openidArr.forEach((openid,index) =>{
                    _p[index] = new Promise((resolve,reject) =>{
                        Mod_reunion.userInfo(openid,function(result){
                            if(result.length > 0){
                                resolve(result)
                            }else{
                                reject()
                            }
                        })
                    })
                })
                Promise.all(_p).then((result) =>{
                    resolve(result)
                }).catch(e =>{
                    LOG(e)
                })
            }else{
                res.send({
                    code:-1,
                    msg:'暂无组委会员'
                })
            }
        })
    }).then((val) =>{
        res.send(val)
    }).catch(e =>{
        LOG(e)
    })
}
this.create_committee = function(req,res){//只能获取最有一个openid
    var params = req.body
    var committee_name = params.committee_name
    var committee_member = params.committee_member
    var member_arr = committee_member.split(',')
    var _p = []
    var arr = []
    new Promise((resolve,reject) =>{
        member_arr.forEach((item,index) =>{
            _p[index] = new Promise((resolve,reject) =>{
                Mod_reunion.find_committee(item,function(result){
                    if(result.length > 0){
                        resolve(result[0].open_id)
                    }else{
                        resolve()
                    }
                })
            })
        })
        Promise.all(_p).then((result) =>{
            resolve(result)
        }).catch(e =>{
            throw e
        })
    }).then((val) =>{
        var new_arr = val.filter(function(arr){
            return arr && arr.trim()
        })
        var obj = {
            g_openid:new_arr,
            g_name:committee_name,
            time:Base.now_time()
        }
        Mod_reunion.create_committee(obj,function(result){
            res.send({
                code:200,
                msg:'新增组委会'
            })
        })
    }).catch(e =>{
        LOG(e)
    })
}
this.renewal_affairs = function(req,res){
    var params = req.body.obj
    var obj = {
        hotel:params.hotel,
        hotel_day:params.hotel_day,
        is_taking:params.is_taking,
        need_pick:params.need_pick,
        need_book:params.need_book,
        family_note:params.family_note,
        family_num:params.family_num,
        pick_note:params.pick_note,
        book_note:params.book_note,
        openid:params.openid
    }
    if(!obj.is_taking){
        obj.family_note = '',
        obj.family_num = ''
    }
    if(!obj.need_book){
        obj.book_note = ''
    }
    if(!obj.need_pick){
        obj.pick_note = ''
    }
    if(obj.hotel == 0 || obj.hotel == 1){
        obj.hotel_day = 0
    }else{
        obj.hotel_day
    }
    Mod_reunion.renewal_affairs(obj,function(result){
        res.send({
            code:200,
            msg:'会务更新成功'
        })
    })
}
this.capture_affairs = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_reunion.capture_affairs(openid,function(result){
        res.send(result)
    })
}
this.advice = function(req,res){
    var arr = []
    var _p = []
    var content = req.body.advice
    var source = req.body.openid
    Mod_reunion.committee(function(result){
        if(result.length > 0){
            arr = result[0].group_openid.split(",")
            var obj = {
                ait:arr,
                content:content,
                time:Base.now_time(),
                source:source
            }
            Mod_reunion.advice(obj,function(result){
                var insert_id = result.insertId
                new Promise((resolve,reject) =>{
                    arr.forEach((item,index) =>{
                        _p[index] = new Promise((resolve,reject) =>{
                            Mod_reunion.record(item,insert_id,function(result){
                                resolve()
                            })
                        })
                    })
                    Promise.all(_p).then((val) =>{
                        resolve()
                    }).catch(e =>{
                        LOG(e)
                    })
                }).then(() =>{
                    res.send({
                        code:200,
                        msg:'新建建议'
                    })
                })
            })
        }else{
            res.send({
                code:-1,
                msg:'没有组员'
            })
        }
    })
}
this.notice = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_reunion.notice(openid,function(val){
        res.send(val)
    })
}
this.myAdvice = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_reunion.myAdvice(openid,function(result){
        new Promise((resolve,reject) =>{
            resolve()
        }).then(() =>{
            for(let i = 0; i < result.length; i++){
                result[i].advice_time = Base.formatDate(result[i].advice_time)
            }
        }).then(() =>{
            res.send(result)
        })
    })
}
this.myAdviceReaded = function(req,res){
    var openid = req.body.openid
    Mod_reunion.myAdviceReaded(openid,function(result){
        res.send({
            code:200,
            msg:'查看建议'
        })
    })
}
this.release_news = function(req,res){
    var params = req.body
    var obj = {
        title:params.title,
        content:params.content,
        is_top:params.is_top,
        time:Base.now_time()
    }
    Mod_reunion.release_news(obj,function(result){
        res.send({
            code:200,
            msg:'发布消息'
        })
    })
}
/**管理端 */
this.capture_meeting = function(req,res){
    var meeting_id = 1
    Mod_reunion.capture_meeting(meeting_id,function(result){
        res.send(result)
    })
}
this.renewal_meeting = function(req,res){
    var params = req.body.data
    var obj = {
        id:params.id,
        name:params.name,
        start_time:Base.formatDate(params.start_time),
        end_time:Base.formatDate(params.end_time),
        place:params.place,
        meeting_status:params.meeting_status,
        note:params.note
    }
    Mod_reunion.renewal_meeting(obj,function(result){
        res.send({
            code:200,
            msg:'更新成功',
        })
    })
}
this.capture_cli_complain = function(req,res){
    var query = url.parse(req.url,true).query
        page = query.page?Number(query.page):1
        pageSize = query.pageSize?Number(query.pageSize):20
        tags_label = query.tags_label
    Mod_reunion.capture_cli_complain(page,pageSize,tags_label,function(result){
        new Promise((resolve,reject) =>{
            resolve()
        }).then(() =>{
            for(let i = 0; i < result.length; i++){
                result[i].plain_time = Base.formatDate(result[i].plain_time)
            }
        }).then(() =>{
            res.send(result)
        })
    })
}
this.renewal_complain = function(req,res){
    console.log(req.body)
    var openid = req.body.openid
    var plain_status = req.body.plain_status
    var name = req.body.name
    var portrait = req.body.portrait
    var id = req.body.id
    var plain_phone = req.body.plain_phone
    Mod_reunion.reunion_info(name,function(result){
        if(result.length > 0){//有此人
            var open_id = result[0].open_id
            Mod_reunion.renewal_complain(openid,plain_status,function(result){
                if(plain_status == 1){
                    Mod_reunion.renewal_reunion(openid,name,portrait,function(result){
                        // Mod_reunion.init_affairs_openId(open_id,openid,function(result){
                        //     Mod_reunion.init_regOpenid(openid,name,function(result){
                                res.send({
                                    code:200,
                                    msg:'更新成功',
                                    value:1//信息被占用
                                })
                        //     })
                        // })
                    })
                }else{
                    Mod_reunion.renewal_complain(openid,plain_status,function(result){
                        let openid = ""
                        // Mod_reunion.renewal_reunion(openid,name,function(result){
                            res.send({
                                code:200,
                                msg:'更新成功',
                                value:2//更新成功
                            })
                        // })
                    })
                }
            })
        }else{//无此人或者姓名拼写错误
            Mod_reunion.renewal_complain(openid,plain_status,function(result){
                res.send({
                    code:200,
                    msg:'更新成功',
                    value:2//信息未被占用
                })
            })
        }
    })
}
this.audit = function(req,res){
    var query = url.parse(req.url,true).query
    var page = query.page?Number(query.page):1
    var pageSize = query.pageSize?Number(query.pageSize):20
    Mod_reunion.audit(page,pageSize,function(result){
        new Promise((resolve,reject) =>{
            resolve()
        }).then(() =>{
            for(let i = 0; i < result.length; i++){
                result[i].regis_time = Base.formatDate(result[i].regis_time)
                if(result[i].clbum == 1){
                    result[i].clbum = '一班'
                }else if(result[i].clbum == 2){
                    result[i].clbum = '二班'
                }else if(result[i].clbum == 3){
                    result[i].clbum = '三班'
                }
            }
        }).then(() =>{
            res.send(result)
        })
    })
}
this.auditUpdate = function(req,res){
    var params = req.body
    var stu_id = params.stu_id;
    var status = params.status
    Mod_reunion.auditUpdate(stu_id,status,function(result){
      res.send({
          code:200,
          msg:'报名审核'
      })  
    })
}