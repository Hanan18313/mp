var config = {}

config.basePath = 'http://localhost:7080';
//config.basePath = 'https://mp.langjie.com';

//数组去重
config.arrayUnique = (arr) => {
	Array.prototype.unique = () => {
		var res = [];
		var json = {};
		for(var i = 0; i < this.length; i++){
		    if(!json[this[i]]){
		   		res.push(this[i]);
		   		json[this[i]] = 1;
		  	}
		}
		return res;
	}
	return arr.unique();
}
export default config
