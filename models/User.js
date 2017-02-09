//User模型类
var mongoose = require('mongoose');
var userSchemas = require('../schemas/user');
var user = mongoose.model('User',userSchemas); //创建模型，第一个参数是模型名字
module.exports = user;