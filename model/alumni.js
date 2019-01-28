
this.base_info = function(openid,callback){
    let str = 'SELECT * FROM alumni_basic INNER JOIN meeting ON alumni_basic.meeting_id = meeting.id WHERE alumni_basic.open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.ranking = function(callback){
    let str = 'SELECT open_id FROM alumni_basic WHERE status = "1"';
    //let str = 'SELECT * FROM annual_basic'
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.base_info_put = function(openid,callback){
    let str = 'INSERT INTO alumni_basic(open_id) VALUE("'+openid+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.class_user = function(stu_id,callback){
    let str = 'SELECT * FROM user WHERE Sid = "'+stu_id+'"';
    CONNN(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.check_name = function(value,callback){
    let str = 'SELECT * FROM user WHERE User_name = "'+value.user_name+'" AND Sid = "'+value.stu_id+'" ';
    CONNN(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.check_teacher_name = function(value,callback){
    let str = 'SELECT * FROM teacher WHERE teacher_name = "'+value.teacher_name+'"';
    CONNN(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.audit_info = function(obj,callback){
    //let str = 'UPDATE alumni_basic SET user_name ="'+obj.user_name+'", addr = "'+obj.addr+'", e_mail = "'+obj.e_mail+'", phone = "'+obj.phone+'", pro = "'+obj.pro+'", clbum = "'+obj.clbum+'", stu_id = "'+obj.stu_id+'", status = "'+obj.status+'", portrait = "'+obj.portrait+'", open_id = "'+obj.openid+'"';
    let str = 'INSERT INTO alumni_basic(user_name,addr,e_mail,phone,pro,clbum,stu_id,status,portrait,open_id,meeting_id) VALUE("'+obj.user_name+'", "'+obj.addr+'", "'+obj.e_mail+'", "'+obj.phone+'", "'+obj.pro+'", "'+obj.clbum+'", "'+obj.stu_id+'", "2", "'+obj.portrait+'", "'+obj.openid+'","1")'
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.complete_info = function(obj,callback){
    let str = 'INSERT INTO alumni_basic(user_name,addr,e_mail,phone,pro,clbum,stu_id,status,portrait,open_id,meeting_id) VALUE("'+obj.user_name+'", "'+obj.addr+'", "'+obj.e_mail+'", "'+obj.phone+'", "'+obj.pro+'", "'+obj.clbum+'", "'+obj.stu_id+'", "3", "'+obj.portrait+'", "'+obj.openid+'","1")'
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.create_affairs = function(obj,callback){
    let str = 'INSERT INTO alumni_affairs(open_id,is_pick,is_taking,is_book,hotel) VALUE("'+obj.openid+'",0,0,0,0)';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.joinIn = function(openid,callback){
    let str = 'UPDATE alumni_basic SET status = "2"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.sub_info = function(obj,callback){
    let str = 'UPDATE alumni_basic SET user_name ="'+obj.user_name+'", addr = "'+obj.addr+'", e_mail = "'+obj.e_mail+'", phone = "'+obj.phone+'", pro = "'+obj.pro+'", clbum = "'+obj.clbum+'", stu_id = "'+obj.stu_id+'" WHERE open_id = "'+obj.openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.get_affairs = function(openid,callback){
    let str = 'SELECT * FROM alumni_affairs WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.post_affairs = function(obj,callback){
    let str = 'UPDATE alumni_affairs SET hotel = "'+obj.hotel+'", is_pick = '+obj.is_pick+', pick_time = "'+obj.pick_time+'", pick_place = "'+obj.pick_place+'", is_taking = '+obj.is_taking+', is_book = '+obj.is_book+', book_time = "'+obj.date+'", shift = "'+obj.shift+'" WHERE open_id = "'+obj.openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.joinIn_list = function(callback){
    let str = 'SELECT user_name, status, portrait FROM alumni_basic ORDER BY user_id DESC limit 30';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.subscribe = function(page,pageSize,callback){
    let startPage = Number((page-1)*pageSize)
    let str = 'SELECT * FROM alumni_basic limit '+startPage+','+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.sub_detail = function(openid,callback){
    let str = 'SELECT * FROM alumni_basic INNER JOIN alumni_affairs ON alumni_basic.open_id = alumni_affairs.open_id WHERE alumni_basic.open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.my_news = function(news_num,callback){
    let str = 'SELECT * FROM alumni_news ORDER BY news_time DESC limit '+news_num;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.init_news = function(openid,callback){
    let news_num = 0
    let str = 'UPDATE alumni_basic SET news_num = '+news_num+' WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.meeting_info = function(meeting_id,callback){
    let str = 'SELECT * FROM meeting WHERE id = "'+meeting_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
/**管理端 */
//会议
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
//审核
this.audit = function(page,pageSize,callback){
    var startPage = Number((page-1)*pageSize)
    let str = 'SELECT * FROM alumni_basic WHERE status < 3 ORDER BY user_id DESC limit '+startPage+', '+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.audit_screen = function(tags_label,page,pageSize,callback){
    let startPage = Number((page-1)*pageSize)
    if(tags_label == '1'){//不选择
        let str = 'SELECT * FROM alumni_basic WHERE status < 3 ORDER BY user_id DESC limit '+startPage+', '+pageSize;
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }else if(tags_label == '2'){//通过
        let str = 'SELECT * FROM alumni_basic WHERE status = "1" ORDER BY user_id DESC limit '+startPage+', '+pageSize;
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }else{//未通过
        let str = 'SELECT * FROM alumni_basic WHERE status = "2" ORDER BY user_id DESC limit '+startPage+', '+pageSize;
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }
}
this.audit_search = function(tags_label,value,callback){
    if(tags_label == '1'){//不选择
        let str = 'SELECT * FROM alumni_basic WHERE user_name LIKE "%'+value+'%" OR stu_id LIKE "%'+value+'%" AND status < 3';
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }else if(tags_label == '2'){//通过审核
        let str = 'SELECT * FROM alumni_basic WHERE user_name LIKE "%'+value+'%" OR stu_id LIKE "%'+value+'%" AND status = "1"';
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }else{//审核中
        let str = 'SELECT * FROM alumni_basic WHERE user_name LIKE "%'+value+'%" OR stu_id LIKE "%'+value+'%" AND status = "2"';
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }
}
this.audit_update = function(stu_id,status,callback){
    let str = 'UPDATE alumni_basic SET status = "'+status+'" WHERE stu_id = "'+stu_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
//消息
this.news = function(news,timestamp,callback){
    let str = 'INSERT INTO alumni_news(news_content,news_time) VALUE("'+news+'","'+timestamp+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.news_num = function(callback){
    let str = 'UPDATE alumni_basic SET news_num = news_num+1';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.history_news = function(callback){
    let str = 'SELECT * FROM alumni_news';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
//会务
this.affairs = function(page,pageSize,callback){
    let startPage = Number((page-1)*pageSize)
    let str = 'SELECT * FROM alumni_basic INNER JOIN alumni_affairs ON alumni_basic.open_id = alumni_affairs.open_id WHERE alumni_basic.status = "1" limit '+startPage+', '+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.affairs_screen = function(screen,page,pageSize,callback){
    let startPage = Number((page-1)*pageSize)
    let str = 'SELECT * FROM alumni_basic INNER JOIN alumni_affairs ON alumni_basic.open_id = alumni_affairs.open_id WHERE alumni_affairs.is_pick = "'+screen.is_pick+'" AND alumni_affairs.is_book = "'+screen.is_book+'" AND alumni_affairs.is_taking = "'+screen.is_taking+'" AND alumni_basic.status = "1" limit '+startPage+', '+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.affairs_search = function(screen,value,page,pageSize,callback){
    let startPage = Number((page-1)*pageSize)
    let str = 'SELECT * FROM alumni_basic INNER JOIN alumni_affairs ON alumni_basic.open_id = alumni_affairs.open_id WHERE alumni_affairs.is_pick = "'+screen.is_pick+'" AND alumni_affairs.is_book = "'+screen.is_book+'" AND alumni_affairs.is_taking = "'+screen.is_taking+'" AND alumni_basic.status = "1" AND alumni_basic.user_name LIKE "%'+value+'%" OR alumni_basic.stu_id LIKE "%'+value+'%" limit '+startPage+', '+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}