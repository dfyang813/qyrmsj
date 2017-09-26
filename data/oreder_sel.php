<?php
    header('Content-Type:application/json;charset=utf-8');
    @$uid=$_REQUEST["uid"];
    require("init.php");
    $sql="select * from dgf_order where uid=$uid";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_ALL($result,MYSQLI_ASSOC);
    echo json_encode($row);
?>