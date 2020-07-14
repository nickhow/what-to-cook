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
$sql = "SELECT * FROM cuisines"; 
$result = mysqli_query($conn,$sql);
$content = "<div class='container'><form id='cuisineForm' class='form-group'>";
while($rows = mysqli_fetch_assoc($result)) { 
        $content.="
                <div class'form-check'>
                      <label class='check-container form-check-label' for='".$rows['name']."'>".ucfirst($rows['name'])."
                          <input class='form-check-input' type='checkbox' value='".$rows['name']."' id='".$rows['name']."' >
                          <span class='checkmark'></span>
                      </label>
                </div>
        ";
}
$content.="</form></div>";
echo $content;
?>	