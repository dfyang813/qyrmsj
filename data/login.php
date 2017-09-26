<?php
header("Content-Type:application/json;charset=utf-8");
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
require("init.php");
$sql="select uid from dgf_user where uname='$uname' and upwd=password('$upwd')";
$result=mysqli_query($conn,$sql);
$row  = mysqli_fetch_assoc($result);
  if($row){
    $output = [];
    $output['code'] = 1;
    $output['msg'] = '登陆成功';
    session_start();
    $_SESSION['uname'] = $uname;
    $_SESSION['uid'] = $row['uid'];

  }else {
    $output = [];
    $output['code'] = -1;
    $output['msg'] = '用户名或密码错误';
  }

  echo json_encode($output);
?>