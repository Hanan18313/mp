var formidable  = require('formidable')
var fs = require('fs')
var dealImages = require('images')

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
        console.log(form)
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

module.exports = {
    MulUploadImg:MulUploadImg
}