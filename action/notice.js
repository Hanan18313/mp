var ServiceNotice = require('../service/notice.js')
var url = require('url')
var crypto = require('crypto')

this.getSignName = (req,res,next,) => {
    var params = url.parse(req.url,true).query
    //console.log(params)
    const token = 'langjie';
    const signature = params.signature;
    const echostr = params.echostr;
    const timestamp = params.timestamp;
    const nonce = params.nonce;
    let array = [timestamp,nonce,token].sort().join('')
    const sha1 = crypto.createHash("sha1")
    sha1.update(array);
    const str = sha1.digest('hex')
    res.send(str)
    console.log(token)
    if(str == signature){
        return true
    }else{
        return false
    }
}