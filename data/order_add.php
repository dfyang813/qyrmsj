<?php
header('Content-Type:application/json;charset=utf-8');
$output = [];
@$pic = $_REQUEST['pic'];
@$name = $_REQUEST['name'];
@$price = $_REQUEST['price'];
@$total = $_REQUEST['total'];
@$uid=$_REQUEST['uid'];
//$order_time = time()*1000;PHP中的time()函数返回当前系统时间对应的整数值


//访问数据库
require('init.php');
mysqli_query($conn,'set names utf8');

$sql = "insert into dgf_order values(null,'$pic','$name',now(),$price,$total,$uid)";
$result = mysqli_query($conn, $sql);

$arr = [];
if($result){    //INSERT语句执行成功，需要获取新产生的订单id
    $arr['msg'] = 'succ';
    $arr['reason'] = "订单提交成功";
}else{          //INSERT语句执行失败
    $arr['msg'] = 'error';
    $arr['reason'] = "订单提交失败";
}
$output[] = $arr;
echo json_encode($output);
?>
