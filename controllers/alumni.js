var Mod_alumni = require('../model/alumni.js')
var Base = require('./base.js');
var url = require('url')
var Promise = require('promise')

this.base_info = function(req,res){
    var ranking = []
    var openid = url.parse(req.url,true).query.openid
    Mod_alumni.base_info(openid,function(result){
        Mod_alumni.ranking(function(result1){
            new Promise((resolve,reject) =>{
                resolve()
            }).then(() =>{
                for(let i = 0; i < result1.length; i++){
                    ranking.push(result1[i].open_id)
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
// this.base_info_put = function(req,res){
//     var openid = req.body.openid
//     Mod_alumni.base_info_put(openid,function(result){
//         res.send({
//             code:200,
//             msg:'新增成功'
//         })
//     })
// }
this.class_user = function(req,res){
    var stu_id = url.parse(req.url,true).query.stu_id
    Mod_alumni.class_user(stu_id,function(result){
        res.send(result)
    })
}
this.check_mate = function(req,res){
    var value = url.parse(req.url,true).query
    if(value.user_name){
        Mod_alumni.check_name(value,function(result){
            res.send({
                code:200,
                result:result,
                value:1
            })
        })
    }else if(value.teacher_name){
        Mod_alumni.check_teacher_name(value,function(result){
            res.send({
                code:200,
                result:result,
                value:2
            })
        })
    }else{
        res.send({
            code:500,
            msg:'错误'
        })
    }
}
this.audit_info = function(req,res){
    var params = req.body.obj
    var openid = params.openid
    var obj = {
        user_name:params.user_name,
        addr:params.addr,
        e_mail:params.e_mail,
        phone:params.phone,
        pro:params.pro,
        clbum:params.clbum,
        stu_id:params.stu_id,
        portrait:params.portrait,
        openid:params.openid
    }
    Mod_alumni.base_info(openid,function(result){
        if(result.length == 0){
            if(params.event_type == 'undefined'){
                Mod_alumni.audit_info(obj,function(result){
                    Mod_alumni.create_affairs(obj,function(result){
                        res.send({
                            code:200,
                            msg:'新增成功'
                        })
                    })
                })
            }else{
                Mod_alumni.complete_info(obj,function(result){
                    Mod_alumni.create_affairs(obj,function(result){
                        res.send({
                            code:200,
                            msg:'新增成功'
                        })
                    })
                })
            }
        }else{
            res.send({
                code:200,
                msg:'已存在'
            })
        }
    })
}
this.joinIn = function(req,res){
    var openid = req.body.openid
    Mod_alumni.joinIn(openid,function(result){
        res.send({
            code:200,
            msg:'参加成功'
        })
    })
}
this.sub_info = function(req,res){
    var params = req.body.obj
    var obj = {
        user_name:params.user_name,
        addr:params.addr,
        e_mail:params.e_mail,
        phone:params.phone,
        pro:params.pro,
        clbum:params.clbum,
        stu_id:params.stu_id,
        openid:params.openid
    }
    Mod_alumni.sub_info(obj,function(result){
        res.send({
            code:200,
            msg:'更新成功'
        })
    })
}
this.get_affairs = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_alumni.get_affairs(openid,function(result){
        for(let i = 0; i < result.length; i++){
            if(result[i].is_book == 0){
                result[i].book_time = ''
            }else{
                result[i].book_time = Base.formatDate(result[i].book_time) 
            }
        }
        res.send(result)
    })
}
this.post_affairs = function(req,res){
    var params = req.body.obj
    var obj = {
        hotel:params.hotel,
        is_taking:params.is_taking,
        is_pick:params.is_pick,
        pick_place:params.pick_place,
        pick_time:params.pick_time,
        is_book:params.is_book,
        shift:params.shift,
        date:params.date,
        openid:params.openid
    }
    if(!obj.is_book){
        obj.shift = ''
    }
    if(!obj.is_pick){
        obj.pick_place = ''
        obj.pick_time = ''
    }
    Mod_alumni.post_affairs(obj,function(result){
        res.send({
            code:200,
            msg:'更新成功'
        })
    })
}
this.joinIn_list = function(req,res){
    Mod_alumni.joinIn_list(function(result){
        if(result.length > 0){
            new Promise((resolve,reject) =>{
                resolve()
            }).then(() =>{
                for(let i = 0; i < result.length; i++){
                    if(result[i].status == 1 || result[i].status == 2){
                        result[i].status = '已报名'
                    }else{
                        result[i].status = '未报名'
                    }
                }
            }).then(() =>{
                res.send(result)
            })
        }else{
            res.send({
                code:200,
                msg:'无数据'
            })
        }
    })
}
this.subscribe = function(req,res){
    var query = url.parse(req.url,true).query
    var page = query.page?Number(query.page):1
    var pageSize = query.pageSize?Number(query.pageSize):10
    Mod_alumni.subscribe(page,pageSize,function(result){
        res.send(result)
    })
}
this.sub_detail = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_alumni.sub_detail(openid,function(result){
        if(result[0].clbum == 1){
            result[0].clbum = '一班'
        }else if(result[0].clbum == 2){
            result[0].clbum = '二班'
        }else if(result[0].clbum == 3){
            result[0].clbum = '三班'
        }
        res.send(result)
    })
}
this.my_news = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_alumni.base_info(openid,function(result){
        if(result.length > 0){
            var news_num = result[0].news_num
            Mod_alumni.my_news(news_num,function(result){
                new Promise((resolve,reject) =>{
                    resolve()
                }).then(() =>{
                    for(let i = 0; i < result.length; i++){
                        result[i].news_time = Base.formatDate(result[i].news_time)
                    }
                }).then(() =>{
                    res.send(result)
                })
            })
        }
    })
}
this.init_news = function(req,res){
    var openid = req.body.openid
    Mod_alumni.init_news(openid,function(result){
        res.send({
            code:200,
            msg:'更新成功'
        })
    })
}
this.meeting_info = function(req,res){
    var meeting_id = 1
    Mod_alumni.meeting_info(meeting_id,function(result){
        result[0].start_time = Base.formatDate(result[0].start_time)
        result[0].end_time = Base.formatDate(result[0].end_time)
        res.send(result)
    })
}
/** ********管理端*/
this.audit = function(req,res){
    var params = url.parse(req.url,true).query
    var pageSize = params.pageSize?Number(params.pageSize):10
    var page = params.page?Number(params.page):1
    Mod_alumni.audit(page,pageSize,function(result){
        res.send(result)
    })
}
//筛选审核信息
this.capture_meeting = function(req,res){
    var meeting_id = 1
    Mod_alumni.capture_meeting(meeting_id,function(result){
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
    Mod_alumni.renewal_meeting(obj,function(result){
        res.send({
            code:200,
            msg:'更新成功',
        })
    })
}
this.audit_screen = function(req,res){
    var params = url.parse(req.url,true).query
    var tags_label = params.tags_label
    var pageSize = params.pageSize?Number(params.pageSize):10
    var page = params.page?Number(params.page):1
    Mod_alumni.audit_screen(tags_label,page,pageSize,function(result){
        res.send(result)
    })
}
this.audit_search = function(req,res){
    var params = url.parse(req.url,true).query
    var tags_label = params.tags_label
    var value = params.value
    Mod_alumni.audit_search(tags_label,value,function(result){
        res.send(result)
    })
}
this.audit_update = function(req,res){
    var stu_id = req.body.stu_id;
    var status = req.body.status
    Mod_alumni.audit_update(stu_id,status,function(result){
        res.send({
            code:200,
            msg:'更新成功'
        })
    })
}
this.affairs = function(req,res){
    var query = url.parse(req.url,true).query
    var page = query.page?Number(query.page):1
    var pageSize = query.pageSize?Number(query.pageSize):10
    var screen = {
        is_book:0,
        is_pick:0,
        is_taking:0
     }
    if(query.filters){//附加筛选条件
        var filter = query.filters.split(",");
        new Promise((resolve,reject) =>{
            resolve()
        }).then(() =>{
            for(let i = 0; i < filter.length; i++){
                if(filter[i] == '接机/车'){
                    screen.is_pick = 1
                }else if(filter[i] == '携带家属'){
                    screen.is_taking = 1
                }else if(filter[i] == '预定车/机票'){
                    screen.is_book = 1
                }
            }
        }).then(() =>{
            Mod_alumni.affairs_screen(screen,page,pageSize,function(result){
                new Promise((resolve,reject) =>{
                    resolve()
                }).then(() =>{
                    for(let i = 0; i < result.length; i++){
                        if(result[i].hotel == 1){
                            result[i].hotel = '单人间'
                        }else if(result[i].hotel == 2){
                            result[i].hotel = '双人间'
                        }else{
                            result[i].hotel = '不预定'
                        }
                        result[i].book_time = Base.formatDate(result[i].book_time)
                    }
                }).then(() =>{
                    res.send(result)
                })
            })
        })
    }else{
        Mod_alumni.affairs(page,pageSize,function(result){
            new Promise((resolve,reject) =>{
                resolve()
            }).then(() =>{
                for(let i = 0; i < result.length; i++){
                    if(result[i].hotel == 1){
                        result[i].hotel = '单人间'
                    }else if(result[i].hotel == 2){
                        result[i].hotel = '双人间'
                    }else{
                        result[i].hotel = '不预定'
                    }
                    result[i].book_time = Base.formatDate(result[i].book_time)
                }
            }).then(() =>{
                res.send(result)
            })
        })
    }
}
this.affairs_screen = function(req,res){
    var query = url.parse(req.url,true).query
    var page = query.page?Number(query.page):1
    var pageSize = query.pageSize?Number(query.pageSize):10
    var filter = query.filters.split(',');
     let screen = {
        is_book:0,
        is_pick:0,
        is_taking:0
     }
    new Promise((resolve,reject) =>{
        resolve()
    }).then(() =>{
        for(let i = 0; i < filter.length; i++){
            if(filter[i] == '接机/车'){
                screen.is_pick = 1
            }else if(filter[i] == '携带家属'){
                screen.is_taking = 1
            }else if(filter[i] == '预定车/机票'){
                screen.is_book = 1
            }
        }
    }).then(() =>{
        Mod_alumni.affairs_screen(screen,page,pageSize,function(result){
            new Promise((resolve,reject) =>{
                resolve()
            }).then(() =>{
                for(let i = 0; i < result.length; i++){
                    if(result[i].hotel == 1){
                        result[i].hotel = '单人间'
                    }else if(result[i].hotel == 2){
                        result[i].hotel = '双人间'
                    }else{
                        result[i].hotel = '不预定'
                    }
                    result[i].book_time = Base.formatDate(result[i].book_time)
                }
            }).then(() =>{
                res.send(result)
            })
        })
    })
}
this.affairs_search = function(req,res){
    var query = url.parse(req.url,true).query
    var page = query.page?Number(query.page):1
    var pageSize = query.pageSize?Number(query.pageSize):10
    var value = query.value
    var filter = query.filters.split(',');
    let screen = {
        is_book:0,
        is_pick:0,
        is_taking:0
    }
    new Promise((resolve,reject) =>{
        resolve()
    }).then(() =>{
        for(let i = 0; i < filter.length; i++){
            if(filter[i] == '接机/车'){
                screen.is_pick = 1
            }else if(filter[i] == '携带家属'){
                screen.is_taking = 1
            }else if(filter[i] == '预定车/机票'){
                screen.is_book = 1
            }
        }
    }).then(() =>{
        Mod_alumni.affairs_search(screen,value,page,pageSize,function(result){
            new Promise((resolve,reject) =>{
                resolve()
            }).then(() =>{
                for(let i = 0; i < result.length; i++){
                    if(result[i].hotel == 1){
                        result[i].hotel = '单人间'
                    }else if(result[i].hotel == 2){
                        result[i].hotel = '双人间'
                    }else{
                        result[i].hotel = '不预定'
                    }
                    result[i].book_time = Base.formatDate(result[i].book_time)
                }
            }).then(() =>{
                res.send(result)
            })
        })
    })
}
this.news = function(req,res){
    var news = req.body.news
    var timestamp = req.body.time_stamp
    Mod_alumni.news(news,timestamp,function(result){
        Mod_alumni.news_num(function(result){
            res.send({
                code:200,
                msg:'发送成功'
            })
        })
    })
}
this.history_news = function(req,res){
    Mod_alumni.history_news(function(result){
        new Promise((resolve,reject) =>{
            resolve()
        }).then(() =>{
            for(let i = 0; i < result.length; i++){
                result[i].news_time = Base.formatDate(result[i].news_time)
            }
        }).then(() =>{
            res.send(result)
        })
    })
}