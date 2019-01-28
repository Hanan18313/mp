var Con_alumni = require('../controllers/alumni.js')
var Base = require('../controllers/base.js')

module.exports = function(app){
    app.get('/alumni/userInfo',function(req,res,next){
        Base.userInfo(req,res,next)
    })
    app.get('/alumni/base_info',function(req,res,next){
        Con_alumni.base_info(req,res,next)
    })
    app.put('/alumni/base_info',function(req,res,next){
        Con_alumni.base_info_put(req,res,next)
    })
    app.get('/alumni/class_user',function(req,res,next){
        Con_alumni.class_user(req,res,next)
    })
    app.get('/alumni/check_mate',function(req,res,next){
        Con_alumni.check_mate(req,res,next)
    })
    app.get('/alumni/v_code',function(req,res,next){
        Base.v_code(req,res,next)
    })
    app.put('/alumni/audit_info',function(req,res,next){
        Con_alumni.audit_info(req,res,next)
    })
    app.post('/alumni/joinIn',function(req,res,next){
        Con_alumni.joinIn(req,res,next)
    })
    app.post('/alumni/sub_info',function(req,res,next){
        Con_alumni.sub_info(req,res,next)
    })
    app.get('/alumni/affairs',function(req,res,next){
        Con_alumni.get_affairs(req,res,next)
    })
    app.post('/alumni/affairs',function(req,res,next){
        Con_alumni.post_affairs(req,res,next)
    })
    app.get('/alumni/joinIn_list',function(req,res,next){
        Con_alumni.joinIn_list(req,res,next)
    })
    app.get('/alumni/subscribe',function(req,res,next){
        Con_alumni.subscribe(req,res,next)
    })
    app.get('/alumni/sub_detail',function(req,res,next){
        Con_alumni.sub_detail(req,res,next)
    })
    app.get('/alumni/my_news',function(req,res,next){
        Con_alumni.my_news(req,res,next)
    })
    app.post('/alumni/init_news',function(req,res,next){
        Con_alumni.init_news(req,res,next)
    })
    app.get('/alumni/meeting_info',function(req,res,next){
        Con_alumni.meeting_info(req,res,next)
    })
    /**管理端 */
    app.options('/alumni_cli/*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Expose-Headers', 'token,Content-Type,X-Requested-With');
		res.header("Access-Control-Allow-Headers", 'token,Content-Type,X-Requested-With');
		res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
		res.send('200');
	});
    app.use('/alumni_cli',function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
        next();
    })
    app.get('/alumni_cli/audit',function(req,res,next){
        Con_alumni.audit(req,res,next)
    })
    app.get('/alumni_cli/audit_screen',function(req,res,next){
        Con_alumni.audit_screen(req,res,next)
    })
    app.get('/alumni_cli/audit_search',function(req,res,next){
        Con_alumni.audit_search(req,res,next)
    })
    app.post('/alumni_cli/audit_update',function(req,res,next){
        Con_alumni.audit_update(req,res,next)
    })
    app.get('/alumni_cli/meeting',function(req,res,next){
        Con_alumni.capture_meeting(req,res,next)
    })
    app.post('/alumni_cli/meeting',function(req,res,next){
        Con_alumni.renewal_meeting(req,res,next)
    })
    app.put('/alumni_cli/news',function(req,res,next){
        Con_alumni.news(req,res,next)
    })
    app.get('/alumni_cli/history_news',function(req,res,next){
        Con_alumni.history_news(req,res,next)
    })
    app.get('/alumni_cli/affairs',function(req,res,next){
        Con_alumni.affairs(req,res,next)
    })
    app.get('/alumni_cli/affairs_screen',function(req,res,next){
        Con_alumni.affairs_screen(req,res,next)
    })
    app.get('/alumni_cli/affairs_search',function(req,res,next){
        Con_alumni.affairs_search(req,res,next)
    })
}