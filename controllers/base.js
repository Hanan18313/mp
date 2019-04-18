var url = require('url')
var request = require('request')
var fs = require('fs')
var CONFIG = JSON.parse(fs.readFileSync('./config.json').toString())

/** 
 * 时间格式化
*/
this.formatDate =  function formatDate(time){
    var date = new Date(time);
    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
        if(hour < 10){
            hour = '0'+hour
        }
        if(min < 10){
            min = '0'+min
        }
        if(sec < 10){
            sec = '0'+sec
        }
    if(hour == 0 && min == 0 && sec == 0){
        var newDate = year + '-' +
                month + '-' +
                day;
    return newDate; 
    }else{
        var newTime = year + '-' +
                month + '-' +
                day + ' ' +
                hour + ':' +
                min + ':' +
                sec;
    return newTime; 
    }        
}
/** 
 * 当前时间
*/
this.now_time = function Now_time(){
    var day = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds();
    var year = new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate()
    var signIn_time = year +' '+ day;
    return signIn_time
}
/**
 * 多维数组转换一维数组 
 * */
this.Flatten =  function flatten(arr){
    return [].concat(...arr.map(x => Array.isArray(x) ? flatten(x) : x))
}
this.getMaxMin = function GetMaxMin(arr,maxmin){
    if(maxmin == "max"){
        return Math.max.apply(Math,arr)
    }else if(maxmin == "min"){
        return Math.min.apply(Math,arr)
    }
}
this.getArrIndex = function(arr, obj) {//获取 Array 的index
    let index = null;
    let key = Object.keys(obj)[0];
    arr.every(function(value, i) {
        if (value[key] === obj[key]) {
            index = i;
            return false;
        }
        return true;
    });
    return index;
};
this.findIndexByKeyValue = function FindIndexByKeyValue(arr,key,value){
    for(var i = 0; i < arr.length; i++){
        if(arr[i][key] == value){
            return i;
        }else{
            return null
        }
    }
}
//***********************************获取手机短信验证码 */
this.v_code = function(req,res){
    var mobile = url.parse(req.url,true).query.mobile
    var code =''
    new Promise((resolve,reject) => {
        resolve();
    }).then(() =>{
        for(let i = 0; i < 6; i++){
            code+=Math.floor(Math.random()*10);
        }
    }).then(() =>{
        var proxy_url = CONFIG.proxy_url+'/sms/v_code?code='+code+'&mobile='+mobile
        request.get(proxy_url,function(err,respones,result){
            if(err){
                LOG(err)
            }else{
                res.send({
                    v_code:code
                })
            }
        })
    })
}