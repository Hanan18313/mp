var ServiceNotice = require('../service/notice.js')
var url = require('url')

this.getSignName = (req,res,next) => {
    console.log(url.parse(req.url,true).query)
}