<?php

header("Content-Type:application/json;charset=utf-8");
@$uid = $_REQUEST['uid'] or die('uid required');
@$did = $_REQUEST['did'] or die('did required');

require('init.php');

//判断购物车表中是否已经存在该商品记录
$sql = "SELECT ctid FROM dgf_cart WHERE uid=$uid AND did=$did";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){
    $sql = "update dgf_cart set count=count+1 where uid=$uid AND did=$did";
    $result =mysqli_query($conn,$sql);
    $output['code'] = 2;
      $output['msg'] = '添加成功';
  }
  else //之前曾经购买过该商品，则更新购买数量为参数中的$count
  {
    $sql = "insert into dgf_cart values(null,$uid,$did,1)";
    $result =mysqli_query($conn,$sql);
    $output['code'] = 1;
      $output['msg'] = '成功添加一件商品';
  }


echo json_encode($output);
