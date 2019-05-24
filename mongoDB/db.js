var mongoose = require('mongoose')
mongoose.connect('mongodb://'+CONFIG.host+':27017/'+CONFIG.mongo_database,{
    useNewUrlParser:true,
    user:CONFIG.mongo_user,
    pass:CONFIG.mongo_password
})

const Schema = mongoose.Schema;

module.exports = {
    Schema:Schema
}