//加载express
var express = require('express');
//加载模板
var swig = require('swig');
//加载数据库
var mongoose = require('mongoose');
//处理post请求
var bodyParser = require('body-parser');
//加载cookies
var Cookies = require('cookies');
//创建createServer
var app = express();
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

//body-parser设置 必须放在路由之前
app.use(bodyParser.urlencoded({extended:true}));
//设置cookies
app.use(function( req , res , next){
    req.cookies = new Cookies(req , res);
    req.userInfo = {};
    if(req.cookies.get("userInfo")){
    	try{
    		req.userInfo = JSON.parse(req.cookies.get("userInfo"));
    	}catch(e){

    	}
    }
    next();
});

//路由模块
app.use('/api',require('./routers/api'));
app.use('/admin',require('./routers/admin'));
app.use('/',require('./routers/main'));

//连接数据库
mongoose.connect( 'mongodb://localhost:27017/blog',function(err){
    if(err){
        console.log('连接数据库失败');
    }else{
        console.log('连接数据库成功');
        app.listen(8081);
    }
} );