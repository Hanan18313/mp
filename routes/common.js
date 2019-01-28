var Con_common = require('../controllers/common.js')

module.exports = function(app){
    app.options('/base/*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Expose-Headers', 'token,Content-Type,X-Requested-With');
		res.header("Access-Control-Allow-Headers", 'token,Content-Type,X-Requested-With');
		res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
		res.send('200');
	});
    app.use('/base',function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
        next();
    })
    app.post('/base/login',function(req,res,next){
        Con_common.login(req,res,next)
    })
    app.get('/base/mp_list',function(req,res,next){
        Con_common.mp_list(req,res,next)
    })
    app.post('/base/mp_create',function(req,res,next){
        Con_common.mp_create(req,res,next)
    })
    app.get('/base/mp_info',function(req,res,next){
        Con_common.mp_info(req,res,next)
    })
    app.put('/base/edit_mp',function(req,res,next){
        Con_common.edit_mp(req,res,next)
    })
    app.get('/')
}