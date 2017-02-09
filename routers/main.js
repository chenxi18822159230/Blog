var express = require('express');
var router = express.Router();

router.get('/', function ( req , res , next ) {
	//console.log(req.userInfo.username)
    res.render('main/index',{
    	userInfo:req.userInfo.username
    });
});

module.exports = router;