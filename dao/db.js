var Sequelize = require('sequelize')
var fs = require('fs')

exports.DisSequelize = function(){
    var config = JSON.parse(fs.readFileSync('./config.json').toString());
    return new Sequelize(
        'lj_mp',
        config.mysql_user,
        config.mysql_password,
        {
            host:config.mysql_host,
            port:3306,
            dialect:'mysql',
            pool:{
                max:5,
                min:0,
                idle:10000
            },
            logging:false,
            'define':{
                'underscored':true
            }
        },
    )
}

