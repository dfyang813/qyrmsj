<?php
    header('Content-Type:application/json;charset=utf-8');
    @$uid=$_REQUEST["uid"];
     @$uname=$_REQUEST["uname"];
     @$phone=$_REQUEST["phone"];
     @$attr=$_REQUEST["attr"];
    require("init.php");
    $sql="update dgf_user set uname='$uname',phone=$phone,attr='$attr' where uid=$uid";
    $result=mysqli_query($conn,$sql);
    if($result==true){
        echo '{"code":1,"msg":"修改成功"}';
    }else{
     echo '{"code":-1,"msg":"修改失败"}';
    }
?>