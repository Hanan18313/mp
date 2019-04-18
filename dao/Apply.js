'use strict'

module.exports = function(sequelize,DataTypes){
    return sequelize.define('Apply',{
        id:{
            type:DataTypes.INTEGER(11),
            autoIncrement:true,
            primaryKey:true,
            unique:true
        },
        name:{
            type:DataTypes.STRING
        },
        phone:{
            type:DataTypes.STRING
        },
        company:{
            type:DataTypes.STRING
        },
        job:{
            type:DataTypes.STRING
        },
        applyState:{
            type:DataTypes.STRING,
        },
        applyTime:{
            type:DataTypes.DATE
        },
        passTime:{
            type:DataTypes.DATE
        },
        check_person:{
            type:DataTypes.STRING
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'apply',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })
}