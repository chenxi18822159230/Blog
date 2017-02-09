var index = function(){
    this.selector = {
        //注册
        registeName : "#registeName",
        registePwd : "#registePwd",
        registeRePwd: "#rePwd",
        registeBtn : "#registeBtn",
        //登陆
        loginName : "#loginName",
        loginPwd : "#loginPwd",
        loginBtn : "#loginBtn"
    };

    this.bindEvent = function (){
        var self = this;
        $(this.selector.registeBtn).on("click", function () {
            $.ajax({
                type : "post",
                url : "/api/user/registe",
                dataType : "json",
                data : {
                    username : $(self.selector.registeName).val(),
                    password : $(self.selector.registePwd).val(),
                    repassword:$(self.selector.registeRePwd).val()
                },
                success : function( result ){
                    alert(result.message)
                }
            });
        });

        $(this.selector.loginBtn).on("click",function(){
            $.ajax({
                type : "post",
                url : "/api/user/login",
                dataType : "json",
                data : {
                    username : $(self.selector.loginName).val(),
                    password : $(self.selector.loginPwd).val()
                },
                success : function( result ){
                    if(result.re){
                        $("#userTxt").text("欢迎:"+result.re.username);
                    }
                    alert( result.message );
                }
            });
        });

    };
    return {
        init : this.bindEvent()
    }


}
$(function () {
    index();
});