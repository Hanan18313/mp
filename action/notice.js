var ServiceNotice = require('../service/notice.js')
var url = require('url')

this.getSignName = (req,res,next,) => {
    
    var params = url.parse(req.url,true).query
    console.log(params)
   // res.send(params)
    res.send(res)
}