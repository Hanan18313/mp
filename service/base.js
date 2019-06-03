var formidable  = require('formidable')
var fs = require('fs')
var dealImages = require('images')
const nettime = require('nettime')

class MulUploadImg {
	constructor(uploadDir){
		this.uploadDir = uploadDir;
	}

	upload(req,cb){
		var form = new formidable.IncomingForm();
		var that = this;
		form.encoding = 'utf-8'; 
	    form.uploadDir = DIRNAME+'/public';
	    form.keepExtensions = true; //保留后缀
        form.type = true;
	    form.parse(req, function(err, fields, files) {
	    	if(err){
	    		LOG(err);
	    		return;
			}
			var extName = ''; 
	        switch (files.file.type) {
	            case 'image/pjpeg':
	                extName = 'jpg';
	                break;
	            case 'image/jpeg':
	                extName = 'jpg';
	                break;
	            case 'image/png':
	                extName = 'png';
	                break;
	            case 'image/x-png':
	                extName = 'png';
	                break;
	            default: 
	            	extName = files.file.name.split('.')[files.file.name.split('.').length-1];
	                break;
	        }
	        that.size = files.file.size;
	        that.name = Date.now()+'.'+extName;
	        var path = that.uploadDir.split('/public/')[1];
	        var path_arr = path.split('/');
	        var path_str = DIRNAME+'/public';
	        path_arr.forEach(function(items,index){
	        	path_str += '/'+items;
	        	if(!fs.existsSync(path_str)) fs.mkdirSync(path_str);
	        });
	        var img_name = that.name?'\\'+that.name:files.file.path.split('\\public')[1];
			var new_path = path_str + img_name;
	        fs.renameSync(files.file.path, new_path);
			that.path = new_path;
	        cb(that.name,fields);
	    });
	}

	resize(){
		var size = this.size;
		if(size/1024/1024>1){
			var path = this.path;
			dealImages(path).save(path,{
				quality : size/1024/1024*10
			});
		}
	}

	smallSize(){
		let path = this.path;
		let newPath = DIRNAME+this.uploadDir+'/small_'+this.name;
		dealImages(path).resize(35).save(newPath,{});
	}
}

/**
 * 获取本地时间 
 */

function TIME(t){
	console.log(t)
	//var date
	if(t){
		var date = new Date(t)
	}else{
		var date = new Date()
	}
	var yy = date.getFullYear();
	var MM = date.getMonth()+1;
	var dd = date.getDate()
	if(date.getHours() < 10){
		var HH = '0'+date.getHours()
	}else{
		var HH = date.getHours()
	}
	if(date.getMinutes() < 10){
		var mm = '0'+date.getMinutes()
	}else{
		var mm = date.getMinutes()
	}
	if(date.getSeconds() < 10){
		var SS = '0'+date.getSeconds()
	}else{
		var SS = date.getSeconds()
	}
	if(MM < 10) MM = '0'+MM;
	if(dd < 10) dd = '0'+dd;
	var time = yy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm + ':' + SS;
	return time
}


/*
 * 队列实现 
*/
function Queue() {
	var items = [];	
	this.enqueue = function(element){//向队列尾部添加一个（或是多个）元素
	  	items.push(element);
	};
	this.dequeue = function(){//移除队列的第一个元素，并返回被移除的元素
	  	return items.shift();
	};
	this.front = function(){//返回队列的第一个元素——最先被添加的,也将是最先被移除的元素。队列不做任何变动。（不移除元素，只返回元素信息。与stack的peek方法类似）
	  	return items[0];
	};
	this.isEmpty = function(){//如果队列内没有任何元素就返回true，否则返回false
	  	return items.length == 0;
	};
	this.clear = function(){//移除队列里的所有元素
	  	items = [];
	};
	this.size = function(){//返回队列里的元素个数
	  	return items.length;
	};
	this.print = function(){//打印                                                                                                                                                                                                                             
	  	console.log(items.toString());
	};
}

/**
 * 获取网络时间
 */

getNetTime = function(params,callback){
    const url = 'http://www.ntsc.ac.cn';
    request.get(url,(err,result) => {
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
 /**
  * 时间格式化
  */
 function dateTimeFormate(date){
	if(!date){
	  return
	}else{
	  var d = new Date(date);
	  var year = d.getFullYear();
	  var month = ('0' + (d.getMonth() + 1)).slice(-2);
	  var day = ('0' + (d.getDate())).slice(-2);
	  var hour = ('0' + (d.getHours())).slice(-2);
	  var minutes = ('0' + (d.getMinutes())).slice(-2);
	  var seconds = ('0' + (d.getSeconds())).slice(-2);
	  return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
	}
  }
module.exports = {
	MulUploadImg:MulUploadImg,
	TIME:TIME,
	Queue:Queue,
	getNetTime:getNetTime
}