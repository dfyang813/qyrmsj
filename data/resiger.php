<?php
header("Content-Type:application/json;charset=utf-8");
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
@$phone=$_REQUEST["phone"];
@$attr=$_REQUEST["attr"];
require('init.php');
$sql = "INSERT INTO dgf_user VALUES(null,'$uname',password('$upwd'),$phone,'$attr')";
$result = mysqli_query($conn,$sql);
if($result===true){
    echo '{"code":1,"msg":"注册成功"}';
  }else{
    echo '{"code":-1,"msg":"注册失败"}';
  }
?>