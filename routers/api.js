var express = require('express');
var router = express.Router();
var User = require('../models/User'); //user模型
var result = {
    status : 0,
    re:"",
    message : "system"
};

router.post('/user/registe', function ( req , res , next ) {
    var name = req.body.username;
    var pwd = req.body.password;
    var repwd = req.body.repassword;
    if(name==="" || pwd===""){
        result.message="注册信息不能为空";
        return res.send(result);
    }else if(pwd!=repwd){
        result.message="密码不一致";
        return res.send(result);
    }
    User.findOne({
        username : name
    }).then(function ( userInfo ) {
        if(userInfo){
            result.message="用户名已经被注册";
            return res.send(result);
        }else{
            var user = new User({
                username : name,
                password : pwd
            });
            user.save(function(err){
                if (err) {
                    console.log('注册失败');
                }
                result.message="注册成功";
                return res.send(result);
            });
        }

    });
    /*User.find().then(function(a){ //查找
        console.log(a)
    });*/
});

router.post('/user/login',function( req , res , next){
    var loginInfo = {
        username : req.body.username,
        password : req.body.password
    };
    if( loginInfo.username==="" || loginInfo.password==="" ){
        result.message="登录信息不能为空";
        return res.send(result);
    }
    User.findOne({
        username : loginInfo.username,
        password : loginInfo.password
    }).then(function(userInfo){
        if(userInfo){
            result.message = "登陆成功";
            result.re = {
                username : userInfo.username
            };
            //登陆成功将信息存入cookies
            req.cookies.set('userInfo',JSON.stringify({
                username:userInfo.username
            }));
        }else{
            result.message = "登陆失败，用户名或密码错误";
        }
        return res.send(result);
    });
});

module.exports = router;