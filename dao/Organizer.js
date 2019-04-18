'use strict'

module.exports = function(sequelize,DataTypes){
    return sequelize.define('Organizer',{
        id: {
            type:DataTypes.INTEGER(11),
            autoIncrement:true,
            primaryKey : true,
            unique : true
        },
        user_name:{
            type:DataTypes.STRING
        },
        unionid:{
            type:DataTypes.STRING
        },
        isdel:{
            type:DataTypes.INTEGER(11),
            defaultValue:0
        }
    },{
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'organizer',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}