this.userInfo = function(openid,callback){
    let is_del = 1
    let str = 'SELECT * FROM reunion WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.apply = function(name,callback){
    let str = 'SELECT * FROM reunion WHERE user_name = "'+name+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.apply_openid = function(name,openid,portrait,callback){
    let str = 'UPDATE reunion SET open_id = "'+openid+'", portrait = "'+portrait+'" WHERE user_name = "'+name+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.capture_apply = function(openid,callback){
    let str = 'SELECT * FROM complain WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.complain = function(obj,callback){
    let str = 'INSERT INTO complain (plaintiff,plain_phone,plain_time,plain_status,open_id,portrait) VALUE("'+obj.name+'","'+obj.phone+'","'+obj.time+'","'+obj.status+'","'+obj.openid+'","'+obj.portrait+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.complain_sec = function(obj,callback){
    let str = 'UPDATE complain SET plaintiff = "'+obj.name+'", plain_phone = "'+obj.phone+'", plain_time = "'+obj.time+'", plain_status = "'+obj.status+'", portrait = "'+obj.portrait+'" WHERE open_id = "'+obj.openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.capture_complain = function(openid,callback){
    let str = 'SELECT * FROM complain WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.meeting_info = function(callback){
    let str = 'SELECT * FROM meeting WHERE id = 1';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.completed = function(user_name,callback){
    let str = 'SELECT * FROM reunion WHERE user_name LIKE "%'+user_name+'%"';
    CON(str,function(err,result){
        if(err){ 
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.top_news = function(callback){
    let str = 'SELECT * FROM news WHERE is_top = "1" ORDER BY news_time DESC limit 1';
    CON(str,function(err,result){
        if(err){ 
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.news = function(callback){
    let str = 'SELECT * FROM news WHERE is_top = "0" ORDER BY news_time DESC limit 3';
    CON(str,function(err,result){
        if(err){ 
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.more_news = function(page,pageSize,callback){
    let startPage = Number((page-1)*pageSize)
    let str = 'SELECT * FROM news ORDER BY news_time DESC limit '+startPage+', '+pageSize;
    CON(str,function(err,result){
        if(err){ 
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.detail_news = function(news_id,callback){
    let str = 'SELECT * FROM news WHERE news_id = "'+news_id+'"';
    CON(str,function(err,result){
        if(err){ 
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.check_reunion = function(openid,callback){
    let str = 'SELECT * FROM registration WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.signIn =  function(obj,callback){
    if(obj.stu_id){
        let str = 'INSERT INTO registration(regis_name,stu_id,clbum,department,major,mobile,e_mail,social_account,company,resident,addr1,addr2,open_id,portrait,status) VALUE("'+obj.name+'","'+obj.stu_id+'","'+obj.clbum+'","'+obj.department+'","'+obj.major+'","'+obj.mobile+'","'+obj.e_mail+'","'+obj.social_account+'","'+obj.company+'","'+obj.resident+'","'+obj.addr1+'","'+obj.addr2+'","'+obj.openid+'","'+obj.portrait+'","'+obj.status+'")';
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }else{
        let str = 'INSERT INTO registration(regis_name,clbum,department,major,mobile,e_mail,social_account,company,resident,addr1,addr2,open_id,portrait,status,regis_time) VALUE("'+obj.name+'","'+obj.clbum+'","'+obj.department+'","'+obj.major+'","'+obj.mobile+'","'+obj.e_mail+'","'+obj.social_account+'","'+obj.company+'","'+obj.resident+'","'+obj.addr1+'","'+obj.addr2+'","'+obj.openid+'","'+obj.portrait+'","'+obj.status+'","'+obj.time+'")';
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }
}
this.create_affairs = function(obj,callback){
    let str = 'INSERT INTO receipt(open_id) VALUE("'+obj.openid+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.audit_signIn = function(openid,callback){
    let str = 'SELECT * FROM registration WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.ranking = function(callback){
    let str = 'SELECT open_id FROM registration WHERE status = "1"';
    //let str = 'SELECT * FROM annual_basic'
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.renewal_userInfo = function(Obj,callback){
    let str = 'UPDATE reunion SET department = "'+Obj.department+'", major = "'+Obj.major+'", addr1 = "'+Obj.addr1+'", addr2 = "'+Obj.addr2+'", mobile = "'+Obj.mobile+'", social_account = "'+Obj.social_account+'", company = "'+Obj.company+'", e_mail = "'+Obj.e_mail+'", resident = "'+Obj.resident+'" WHERE open_id = "'+Obj.openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.committee = function(callback){
    let str = 'SELECT group_openid FROM committee';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.find_committee = function(name,callback){
    let str = 'SELECT open_id FROM reunion WHERE user_name = "'+name+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.create_committee = function(obj,callback){
    //let str = 'INSERT INTO committee(group_openid,time) VALUE("'+obj.g_openid+'","'+obj.time+'")';
    let str = 'UPDATE committee SET group_openid = "'+obj.g_openid+'" WHERE org_id = 8'
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.renewal_affairs = function(obj,callback){
    let str = 'UPDATE receipt SET hotel = "'+obj.hotel+'", days = "'+obj.hotel_day+'", is_taking = '+obj.is_taking+', family_num = "'+obj.family_num+'", family_note = "'+obj.family_note+'", need_pick = '+obj.need_pick+', pick_note = "'+obj.pick_note+'", need_book = '+obj.need_book+', book_note = "'+obj.book_note+'" WHERE open_id = "'+obj.openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
    
}
this.capture_affairs = function(openid,callback){
    let str = 'SELECT * FROM receipt WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.advice = function(obj,callback){
    let str = 'INSERT INTO advice (ait,advice_content,advice_time,source) VALUE("'+obj.ait+'","'+obj.content+'","'+obj.time+'","'+obj.source+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.record = function(item,insert_id,callback){
    let str = 'INSERT INTO record(r_openid,advice_id) VALUE("'+item+'","'+insert_id+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.notice = function(openid,callback){
    let str= 'SELECT * FROM record WHERE r_openid = "'+openid+'" AND is_read = 0';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.myAdvice = function(openid,callback){
    let str = 'SELECT * FROM advice INNER JOIN reunion ON advice.source = reunion.open_id RIGHT JOIN record ON advice.advice_id = record.advice_id WHERE record.r_openid = "'+openid+'" ORDER BY advice.advice_time DESC';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.myAdviceReaded = function(openid,callback){
    let str = 'UPDATE record SET is_read = 1 WHERE r_openid = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.release_news = function(obj,callback){
    let str = 'INSERT INTO news (news_title,news_content,news_time,is_top) VALUE("'+obj.title+'","'+obj.content+'","'+obj.time+'",'+obj.is_top+')';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
/**管理端 */
this.capture_meeting = function(meeting_id,callback){
    let str = 'SELECT * FROM meeting WHERE id = "'+meeting_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.renewal_meeting = function(obj,callback){
    let str = 'UPDATE meeting SET name = "'+obj.name+'", start_time = "'+obj.start_time+'", end_time = "'+obj.end_time+'", place = "'+obj.place+'", meeting_status = "'+obj.meeting_status+'", note = "'+obj.note+'" WHERE id = "'+obj.id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.capture_cli_complain = function(page,pageSize,tags_label,callback){
    let startPage = Number((page-1)*pageSize)
    if(tags_label == '1'){//不选择
        let str = 'SELECT * FROM complain WHERE plain_status < 3 limit '+startPage+', '+pageSize;
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }else if(tags_label == '2'){//已通过
        let str = 'SELECT * FROM complain WHERE plain_status = 1 limit '+startPage+', '+pageSize;
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }else if(tags_label == '3'){//申诉中
        let str = 'SELECT * FROM complain WHERE plain_status = 2 limit '+startPage+', '+pageSize;
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }else if(tags_label == '4'){
        let str = 'SELECT * FROM complain WHERE plain_status = 0 limit '+startPage+', '+pageSize;
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }
}
this.renewal_complain = function(openid,plain_status,callback){
    let str = 'UPDATE complain SET plain_status = '+plain_status+' WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.insert_reunion = function(openid,name,plain_phone,callback){
    let str = 'INSERT INTO reunion (user_name,mobile,open_id) VALUE("'+name+'","'+plain_phone+'","'+openid+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.reunion_info = function(name,callback){
    let str = 'SELECT * FROM reunion WHERE user_name = "'+name+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.renewal_reunion = function(openid,name,portrait,callback){
    let str = 'UPDATE reunion SET open_id = "'+openid+'", portrait = "'+portrait+'" WHERE user_name = "'+name+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.init_affairs_openId = function(open_id,openid,callback){//更新回执表openid none
    let str = 'UPDATE receipt SET open_id = "'+open_id+'" WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.init_regOpenid = function(openid,name,callback){///none
    let str = 'UPDATE registration SET open_id = "'+openid+'" WHERE regis_name = "'+name+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.audit = function(page,pageSize,callback){
    let startPage = Number((page - 1) * pageSize)
    let str = 'SELECT * FROM registration limit '+startPage+', '+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.auditUpdate = function(stu_id,status,callback){
    let str = 'UPDATE registration SET status = "'+status+'" WHERE stu_id = "'+stu_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}