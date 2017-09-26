<?php
header('Content-Type:application/json;charset=utf-8');

$start = $_REQUEST['start'] ;


require('init.php');
$sql = "select did,name,price,img_sm,material from dgf_dish limit $start,5";
$result = mysqli_query($conn,$sql);

$output=[];
while(true)
{
  $row = mysqli_fetch_assoc($result);
  if(!$row)
  {
    break;
  }
  $output[] = $row;
}

echo json_encode($output);



?>