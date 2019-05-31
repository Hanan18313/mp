
module.exports = function(app){
    app.get('/index',function(req,res,next){
        res.render('./canvas')
    })
    app.get('/canvas',function(req,res,next){
        res.render('./CanvasD')
    })
    app.get('/share',function(req,res,next){
        res.render('./share')
    })
    app.get('/express',function(req,res,next){
        res.render('./express')
    })
}