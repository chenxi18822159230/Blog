//加载express
var express = require('express');
//创建createServer
var app = express();
//加载模板
var swig = require('swig');
//配置模板应用
//模板引擎
//第一个参数，模板引擎名称也是后缀名like ejs,html等，第二个参数解析处理模板内容方法
app.engine('html',swig.renderFile);
//设置模板文件存放目录 ,第一个参数必须是views，第二个是目录
app.set('views','./views');
//注册所使用的模板引擎第一个参数必须是 view engine，第二个参数和app.engine方法中第一个参数一致
app.set('view engine','html');
//开发时，取消缓存设置
swig.setDefaults({cache:false});
//静态文件托管
app.use('/public',express.static(__dirname+'/public'));
////跳转首页
///*
//* 读取views目录下指定文件，解析返回客户端
//* 第一个参数：模板文件，相对于views目录， views/index.htlm
//* 第二个参数，传递给模板的数据
//*/
//app.get('/', function ( req , res , next) {
//    res.render('index');
//});
app.use('/',require('./routers/main'));
app.listen(8081);