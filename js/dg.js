/**
 * Created by Administrator on 2017/8/28.
 */
var app=angular.module("dgfModule",['utilityModule']);
//配置状态
app.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
    $ionicConfigProvider
        .tabs.position('bottom');
    $stateProvider.state('dgfStart',{
        url:'/dgfStart',
        templateUrl:'tpl/start.html',
        controller:'startCtrl'
    })
        .state('dgfMain',{
            url:'/dgfMain',
            templateUrl:'tpl/main.html',
            controller:'mainCtrl'
        })
        .state('dgfDetail',{
            url:'/dgfDetail/:did',
            templateUrl:'tpl/detail.html',
            controller:'detailCtrl'
        })
        .state('dgfOrder',{
            url:'/dgfOrder',
            templateUrl:'tpl/order.html'
        })
        .state('dgfMyOrder',{
            url:'/dgfMyOrder',
            templateUrl:'tpl/myOrder.html',
            controller:'myOrderCtrl'
        })
        .state('dgfMyCart',{
            url:'/dgfMyCart',
            templateUrl:'tpl/myCart.html',
            controller:'cartCtrl'
        })
        .state('dgfSetting',{
            url:'/dgfSetting',
            templateUrl:'tpl/settings.html',
            controller:'aboutCtrl'
        })
        .state('dgfLogin',{
            url:'/dgfLogin',
            templateUrl:'tpl/login.html',
            controller:'loginCtrl'
        })
        .state('dgfResiger',{
            url:'/dgfResiger',
            templateUrl:'tpl/resiger.html',
            controller:'regCtrl'
        })

    $urlRouterProvider
        .otherwise('/dgfStart')
});
//定义侧边栏
app.controller('myCtrl',['$scope','$ionicSideMenuDelegate',function($scope,$ionicSideMenuDelegate){
    $scope.openRightMenu=function(){
        $ionicSideMenuDelegate.toggleLeft();
    }
}]);
//定义一个全局的跳转事件
app.controller('bodyCtrl',['$scope','$state','$dgfHttp',function($scope,$state,$dgfHttp){
    $scope.jump=function(desState,arg){
        $state.go(desState,arg);
    };
    $scope.delLogin=function(){
        var n=$(".mu").html();
        if(n=="未登录"){
            $(".mu").html("未登录");
        }else{
            $dgfHttp.sendRequest('data/delses.php',function(data){
                $state.go("dgfLogin");
                $(".mu").html("未登录");
                $(".mu").css("fontSize",18);
            })
        }
    }
    $scope.addTo=function($event){
        $($event.target).addClass("active").parent("a").siblings("a").children("i").removeClass("active");
    }
}]);
//实现用户注册
app.controller('regCtrl',['$scope', '$stateParams','$state','$ionicPopup',
    '$httpParamSerializerJQLike', '$dgfHttp',
    function($scope,$stateParams,$state,$ionicPopup,$httpParamSerializerJQLike,$dgfHttp){
        $scope.order={};
        $scope.login=function(){
            var param=$httpParamSerializerJQLike($scope.order);
            $dgfHttp.sendRequest('data/resiger.php?'+param,function(data){
                if(data.code==1){
                    $ionicPopup.alert({
                        template:data.msg
                    })
                    $state.go("dgfLogin");
                }else{
                    $ionicPopup.alert({
                        template:data.msg
                    })
                }
            })
        };
        $scope.blur=function(){
            var u=$scope.order.uname;
            var reg = /^[0-9a-z]{6,12}$/i;
            if(u!=undefined) {
                if(!reg.test(u)){
                    $ionicPopup.alert({
                        template:'用户名为6-12位的数字或字母'
                    });
                }else {
                    $dgfHttp.sendRequest('data/testreg.php?uname=' + u, function (data) {
                        if (data.code == -1) {
                            $ionicPopup.alert({
                                template:data.msg
                            })
                        } else {
                            $ionicPopup.alert({
                                template:data.msg
                            })
                        }
                    })
                }
            }
    }
    $scope.show=function(){
        var pwd = /^[0-9a-z]{6,12}$/i;
        var upwd=$scope.order.upwd;
        if(!pwd.test(upwd)){
            $ionicPopup.alert({
                template:'密码为6-12位的数字或字母'
            })
            return;
        }
    }
        $scope.test=function(){
            var url=/^1[34578]\d{9}$/;
            var uphone=$scope.order.phone;
            if(!url.test(uphone)){
                $ionicPopup.alert({
                    template:'手机号格式不正确'
                })
                return;
            }
        }
    }]);
//实现用户登录
app.controller('loginCtrl',['$scope','$state','$dgfHttp','$httpParamSerializerJQLike','$ionicPopup',
    function($scope,$state,$dgfHttp,$httpParamSerializerJQLike,$ionicPopup){
    $scope.order={};
    $scope.loginClick=function(){

        var parms=$httpParamSerializerJQLike($scope.order);
        $dgfHttp.sendRequest('data/login.php?'+parms,function(data){
            if(data.code==1){
                $ionicPopup.alert({
                    template:$scope.order.uname+" 欢迎您！"
                })
                $state.go("dgfStart");
            }else{
                $ionicPopup.alert({
                    template:data.msg
                })
            }
        })
    }
}]);
//改变侧边栏未登录状态=>换为用户名
app.controller('startCtrl',['$scope','$dgfHttp',function($scope,$dgfHttp){
    $dgfHttp.sendRequest('data/data.php',function(data){
        $(".mu").html(data.uname);
        $(".mu").css("fontSize",18);
    })
}]);
//实现商品界面上拉刷新，关键词查找商品,点击商品跳转到商品详情页
app.controller('mainCtrl',['$scope','$dgfHttp',function($scope,$dgfHttp){
    $scope.dishList=[];
    $scope.hasMore=true;
    $scope.word={kw:''};
    $dgfHttp.sendRequest('data/dish_getbypage.php?start=0',function(data){
        $scope.dishList=data;
    });
    $scope.loadMore=function(){
        $dgfHttp.sendRequest('data/dish_getbypage.php?start='+$scope.dishList.length,function(data){
            if(data.length<5){
                $scope.hasMore=false;
            }
            $scope.dishList=$scope.dishList.concat(data);
            $scope.$broadcast("scroll.infiniteScrollComplete");
        })
    };

    $scope.$watch('word.kw',function(){
        if($scope.word.kw.length>0){
            $dgfHttp.sendRequest('data/dish_getbykw.php?kw='+$scope.word.kw,function(data){
                if(data.length>0)
                $scope.dishList=data;
            })
        }
    })
}]);
//实现添加商品到购物车
app.controller('detailCtrl',['$scope','$dgfHttp','$stateParams','$state','$ionicPopup',
    function($scope,$dgfHttp,$stateParams,$state,$ionicPopup){
    $scope.did=$stateParams.did;
    $dgfHttp.sendRequest('data/dish_getbyid.php?did='+$scope.did,function(data){
        $scope.dish=data[0];
    });
    $scope.addToCart=function(){
        $dgfHttp.sendRequest('data/data.php',function(data){
            $scope.uid=data.uid;
            if($scope.uid==undefined){
                $ionicPopup.alert({
                    template:"请先登录"
                })
            }else{
            $dgfHttp.sendRequest('data/cart_update.php?uid='+$scope.uid+'&did='+$scope.did,function(data){
                $ionicPopup.alert({
                    template:data.msg
                })
                $state.go("dgfMyCart");
            })}
        })
    }

}]);
//实现对购物车的编辑功能，比如增加减少商品，计算合计，还有提交订单功能
app.controller('cartCtrl',['$scope','$dgfHttp','$state','$ionicPopup',
    function($scope,$dgfHttp,$state,$ionicPopup){
    $scope.cartList=[];
    $scope.editMsg="编辑";
    $scope.editEnable = true;
    $scope.isCartEmpty =false;
    $scope.toggleEditStatus=function(){
        $scope.editEnable = !$scope.editEnable;
        if($scope.editEnable){
            $scope.editMsg="编辑";
        }else{
            $scope.editMsg="完成";
        }
    };
    $dgfHttp.sendRequest('data/data.php',function(data){
        $scope.uid=data.uid;
        $dgfHttp.sendRequest('data/cart_select.php?uid='+$scope.uid,function(data){
            $scope.cartList=data;
            if($scope.cartList.length == 0)
            {
                $scope.isCartEmpty =true;
            }
        })
    })
    $scope.deleteFromCart=function(index){
        if($scope.cartList[index].count==1){
            return
        }
        $dgfHttp.sendRequest('data/data.php',function(data){
            $scope.uid=data.uid;
            var path="data/cart_update.php?uid="+$scope.uid+"&did="+$scope.cartList[index].did
            +"&count="+($scope.cartList[index].count-1);
            $dgfHttp.sendRequest(path,function(data){
                if(data.code==2){
                    $scope.cartList[index].count=$scope.cartList[index].count-1;
                }
            })
        })}
        $scope.addToCart=function(index){
        $dgfHttp.sendRequest('data/data.php',function(data){
            $scope.uid=data.uid;
            var path="data/cart_update.php?uid="+$scope.uid+"&did="+$scope.cartList[index].did
                +"&count="+(parseInt($scope.cartList[index].count)+1);
            $dgfHttp.sendRequest(path,function(data){
                if(data.code==2){
                    $scope.cartList[index].count=parseInt($scope.cartList[index].count)+1;
                }
            })
        })
    }
    $scope.calcSum=function(){
        var sum=0;
        for(var i=0;i<$scope.cartList.length;i++){
            sum+=$scope.cartList[i].count*$scope.cartList[i].price;
        }
        return "￥"+sum;
    }
    $scope.del=function($event){
        $scope.cid=$($event.target).attr("name");
        $ionicPopup.confirm({
            template:"确定要删除此商品么?"
        }).then(function(res){
            if(res){
                $dgfHttp.sendRequest('data/cart_delete.php?ctid='+$scope.cid,function(data){
                    if(data.code==1){
                        $($event.target).parent().remove();
                        $ionicPopup.alert({
                            template:data.msg
                        })
                    }
                    $dgfHttp.sendRequest('data/cart_select.php?uid='+$scope.uid,function(data){
                        $scope.cartList=data;
                        if($scope.cartList.length == 0)
                        {
                            $scope.isCartEmpty =true;
                        }
                    })
                })
            }else{
                return;
            }
        });

    }
//提交订单
        $scope.jumpToOrder = function () {
            $scope.obj = $scope.cartList;
            console.log($scope.obj);
            $dgfHttp.sendRequest('data/data.php', function (data) {
                $scope.uid = data.uid;
                var parse = 'data/order_add.php?pic=' + $scope.obj[0].img_sm + '&name=' + $scope.obj[0].name +
                    '&price=' + $scope.obj[0].price + '&total=' + parseFloat($scope.calcSum().split("￥")[1]) +
                    '&uid=' + $scope.uid;
                $dgfHttp.sendRequest(parse, function (data) {
                    $ionicPopup.alert({
                        template:data[0].reason
                    })
                    $state.go("dgfMyOrder");
                })
            });
            $dgfHttp.sendRequest('data/data.php',function(data){
                $scope.uid=data.uid;
                $dgfHttp.sendRequest('data/cart_succ.php?uid='+$scope.uid,function(data){
                    $scope.isCartEmpty =true;
                })
            })
        }


}]);
//实现查看我的订单功能
app.controller('myOrderCtrl',['$scope','$dgfHttp','$ionicPopup',
    function($scope,$dgfHttp,$ionicPopup){
    $dgfHttp.sendRequest('data/data.php',function(data){
        $scope.uid=data.uid;
        if($scope.uid!=undefined){
        $dgfHttp.sendRequest('data/oreder_sel.php?uid='+$scope.uid,function(data){
            $scope.orderList=data;
    })}
    })
        $scope.delOrder=function($event){
            var oid=$($event.target).attr("name");
            var change=$ionicPopup.confirm({
                template:"确定要删除这条信息么?"
            });
            change.then(function(res){
                if(res){
                    $dgfHttp.sendRequest('data/order_del.php?oid='+oid,function(data){
                        if(data.code==1) {
                            $ionicPopup.alert({
                                template: data.msg
                            })
                            $($event.target).parent().parent().remove();
                        }
                    })
                }else{
                    return;
                }
            })

        }
}]);
//设置功能模态框功能和退出登录功能.
app.controller('aboutCtrl',['$scope','$ionicModal','$dgfHttp','$state','$ionicPopup',function($scope,$ionicModal,
      $dgfHttp,$state,$ionicPopup){
            $ionicModal.fromTemplateUrl('tpl/perinfo.html',{
                scope:$scope,
                animation:'slide-in-up'
            }).then(function(modal){
                $scope.info=modal;
            });
            $scope.showModal=function(){
                $dgfHttp.sendRequest('data/data.php',function(data){
                    $scope.uid=data.uid;
                    if($scope.uid!=undefined){
                $dgfHttp.sendRequest('data/data.php',function(data){
                    $scope.uid=data.uid;
                    if($scope.uid!=undefined){
                        $dgfHttp.sendRequest('data/user_info.php?uid='+$scope.uid,function(data){
                            $scope.dish=data;
                        })}
                })
                $scope.info.show();
            }else{
                        $ionicPopup.alert({
                            template:'登陆后才可查看个人信息'
                        })
                    }
                })
            $scope.hideModal=function(){
                $scope.info.hide();
            }
        }
    $ionicModal.fromTemplateUrl('tpl/about.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $scope.delLogin=function(){
        $dgfHttp.sendRequest('data/delses.php',function(data){
            if(data.code==1) {
                $ionicPopup.alert({
                    template: '您已退出登录'
                })
                $state.go("dgfLogin");
                $(".mu").html("未登录");
                $(".mu").css("fontSize", 18);
            }
        })
    }
    $scope.edit="编辑";
    $scope.enable = true;
    $scope.tol=function(){
        $scope.enable = !$scope.enable;
        if($scope.enable){
            $scope.edit="编辑";
        }else{
            $scope.edit="取消";
        }
    };
    $scope.submitOrder=function(){
$dgfHttp.sendRequest('data/data.php',function(data){
    var uid=data.uid;
    var uname=$("#u").val();
    var phone=$("#phone").val();
    var attr=$("#attr").val();
    console.log(uid,uname,phone,attr);
    $dgfHttp.sendRequest("data/update.php?uname="+uname+"&phone="+phone+"&attr="+attr+"&uid="+uid,
    function(data){
        if(data.code==1) {
            $ionicPopup.alert({
                template:data.msg
            })
            $scope.enable=true;
            $scope.edit="编辑";
            $(".mu").html(uname);
            $(".mu").css("fontSize",18);
            $dgfHttp.sendRequest('data/user_info.php?uid='+$scope.uid,function(data){
                $scope.dish=data;
            })
        }else{
            $ionicPopup.alert({
                template:data.msg
            })
        }
    })
})}
}]);

