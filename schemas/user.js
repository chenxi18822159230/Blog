var mongoose = require('mongoose');
//用户表结构 也就是blog中的user表
var schemas = new mongoose.Schema({
    //用户名
    username:String,
    //密码
    password:String
});

module.exports = schemas;