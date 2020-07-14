<?php
$host = "fdb22.atspace.me";
$user = "3377003_whattoeat";
$password = "c0ffeer0asters";
$dbname = "3377003_whattoeat";

$conn = mysqli_connect($host, $user, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
$sql = "SELECT * FROM ingredients";
$result = mysqli_query($conn,$sql);
$data_array = array(); 
while($rows =mysqli_fetch_assoc($result)) { $data_array[] = $rows; } 
echo json_encode($data_array);
?>	