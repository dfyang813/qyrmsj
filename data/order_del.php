<?php
header("Content-Type:application/json;charset=utf-8");
@$oid = $_REQUEST['oid'];
require('init.php');
$sql = "DELETE FROM dgf_order WHERE oid=$oid";
$result = mysqli_query($conn,$sql);
if($result){
  $output['code']=1;
  $output['msg']='订单取消成功';
}else {
  $output['msg']='删除失败';
}


echo json_encode($output);