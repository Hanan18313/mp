'use strict'

 const DisSequelize = require('./db').DisSequelize();
 const Apply = DisSequelize.import('./Apply.js');
 const Organizer = DisSequelize.import('./Organizer.js');

 const lj_NodeSequelize = require('./AnotherDB').lj_NodeSequelize();
 const Vip_basic = lj_NodeSequelize.import('./Vip_basic.js'); 

 // 同步模型到数据库中
 DisSequelize.sync({force: false});


exports.Vip_basic = Vip_basic;
exports.Apply = Apply;
exports.Organizer = Organizer


