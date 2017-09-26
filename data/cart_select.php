<?php

header("Content-Type:application/json;charset=utf-8");
@$uid = $_REQUEST['uid'] or die('uid required');

require('init.php');

$output['uid'] = $uid;

$sql = "SELECT dgf_cart.ctid,dgf_cart.did,dgf_cart.count,dgf_dish.name,dgf_dish.img_sm,
dgf_dish.price FROM dgf_dish,dgf_cart WHERE dgf_cart.did=dgf_dish.did AND dgf_cart.uid='$uid'";
$result = mysqli_query($conn,$sql);
$row= mysqli_fetch_All($result,MYSQLI_ASSOC);


echo json_encode($row);
