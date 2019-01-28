var Con_reunion = require('../controllers/reunion.js')
var Common = require('../controllers/common.js')
var Base = require('../controllers/base.js')

module.exports = function(app){
    app.get('/reunion/wx_info',function(req,res,next){
        Base.userInfo(req,res,next)
    })
    app.get('/reunion/userInfo',function(req,res,next){
        Con_reunion.userInfo(req,res,next)
    })
    app.post('/reunion/apply',function(req,res,next){
        Con_reunion.apply(req,res,next)
    })
    app.get('/reunion/apply',function(req,res,next){
        Con_reunion.capture_apply(req,res,next)
    })
    app.put('/reunion/complain',function(req,res,next){
        Con_reunion.complain(req,res,next)
    })
    app.get('/reunion/complain',function(req,res,next){
        Con_reunion.capture_complain(req,res,next)
    })
    app.get('/reunion/meeting',function(req,res,next){
        Con_reunion.meeting_info(req,res,next)
    })
    app.get('/reunion/complete',function(req,res,next){
        Con_reunion.completed(req,res,next)
    })
    app.get('/reunion/news',function(req,res,next){
        Con_reunion.news(req,res,next)
    })
    app.get('/reunion/more_news',function(req,res,next){
        Con_reunion.more_news(req,res,next)
    })
    app.put('/reunion/signIn',function(req,res,next){
        Con_reunion.signIn(req,res,next)
    })
    app.get('/reunion/audit_signIn',function(req,res,next){
        Con_reunion.audit_signIn(req,res,next)
    })
    app.post('/reunion/userInfo',function(req,res,next){
        Con_reunion.renewal_userInfo(req,res,next)
    })
    app.get('/reunion/committee',function(req,res,next){
        Con_reunion.committee(req,res,next)
    })
    app.put('/reunion/committee',function(req,res,next){
        Con_reunion.create_committee(req,res,next)
    })
    app.get('/reunion/committee_info',function(req,res,next){
        Con_reunion.committee_info(req,res,next)
    })
    app.post('/reunion/affairs',function(req,res,next){
        Con_reunion.renewal_affairs(req,res,next)
    })
    app.get('/reunion/affairs',function(req,res,next){
        Con_reunion.capture_affairs(req,res,next)
    })
    app.put('/reunion/advice',function(req,res,next){
        Con_reunion.advice(req,res,next)
    })
    app.get('/reunion/notice',function(req,res,next){
        Con_reunion.notice(req,res,next)
    })
    app.get('/reunion/myAdvice',function(req,res,next){
        Con_reunion.myAdvice(req,res,next)
    })
    app.post('/reunion/myAdvice',function(req,res,next){
        Con_reunion.myAdviceReaded(req,res,next)
    })
    /**管理端 */
    app.options('/reunion_cli/*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Expose-Headers', 'token,Content-Type,X-Requested-With');
		res.header("Access-Control-Allow-Headers", 'token,Content-Type,X-Requested-With');
		res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
		res.send('200');
	});
    app.use('/reunion_cli',function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
        next();
    })
    app.get('/reunion_cli/meeting',function(req,res,next){
        Con_reunion.capture_meeting(req,res,next)
    })
    app.post('/reunion_cli/meeting',function(req,res,next){
        Con_reunion.renewal_meeting(req,res,next)
    })
    app.get('/reunion_cli/complain',function(req,res,next){
        Con_reunion.capture_cli_complain(req,res,next)
    })
    app.post('/reunion_cli/complain',function(req,res,next){
        Con_reunion.renewal_complain(req,res,next)
    })
    app.get('/reunion_cli/audit',function(req,res,next){
        Con_reunion.audit(req,res,next)
    })
    app.post('/reunion_cli/audit',function(req,res,next){
        Con_reunion.auditUpdate(req,res,next)
    })
}