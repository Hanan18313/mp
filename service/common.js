
/**
 * 	数组去重
 */
this.arrayUnique = function (arr){
    Array.prototype.unique = function(){
        var res = []
        var json = {}
        for(let i = 0; i < this.length; i++){
            if(!json[this[i]]){
                res.push(this[i])
                json[this[i]] = 1
            }
        }
        return res
    }
    return arr.unique()
}

/**
 * 超级权限
 */

