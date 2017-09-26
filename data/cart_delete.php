<?php
/**
*根据购物车详情记录编号删除该购买记录
*请求参数：
  ctid-详情记录编号 ,o
*输出结果：
* {"code":1,"msg":"succ"}
* 或

* {"code":400}
*/
header("Content-Type:application/json;charset=utf-8");
@$ctid = $_REQUEST['ctid'] or die('ctid required');
require('init.php');
$sql = "DELETE FROM dgf_cart WHERE ctid=$ctid";
$result = mysqli_query($conn,$sql);
if($result){
  $output['code']=1;
  $output['msg']='删除成功';
}else {
  $output['msg']='删除失败';
}


echo json_encode($output);
