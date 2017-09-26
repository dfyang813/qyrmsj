<?php
header("Content-Type:application/json;charset=utf-8");
@$uid=$_REQUEST["uid"];
require("init.php");
$sql="select * from dgf_user where uid=$uid";
$result=mysqli_query($conn,$sql);
$row  = mysqli_fetch_assoc($result);
  echo json_encode($row);
?>