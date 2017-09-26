<?php
   header("Content-Type:application/json;charset=utf-8");
    @$uname=$_REQUEST["uname"];
    require("init.php");

    $sql="select * from dgf_user where uname='$uname'";
    $result=mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    if($row!==NULL){
      echo '{"code":-1,"msg":"用户名已被占用"}';
        }else{
          echo '{"code":1,"msg":"用户名输入正确"}';
        }
?>