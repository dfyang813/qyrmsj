<?php
header("Content-Type:application/json;charset=utf-8");
@$uid = $_REQUEST['uid'];
require('init.php');
$sql = "DELETE FROM dgf_cart WHERE uid=$uid";
$result = mysqli_query($conn,$sql);
if($result){
  $output['code']=1;
  $output['msg']='删除成功';
}else {
  $output['msg']='删除失败';
}


echo json_encode($output);