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
$sql = "SELECT * FROM diets"; 
$result = mysqli_query($conn,$sql);
$content = "<div class='container'><form id='dietForm' class='form-group'>";
$content.="
            <label class='radio-container'>Any diet
                  <input type='radio' name='radio' value=''>
                  <span class='radio-checkmark'></span>
            </label>
        ";
while($rows = mysqli_fetch_assoc($result)) {  
         $content.="
                
                      <label class='radio-container'>".ucfirst($rows['name'])."
                          <input type='radio' name='radio' value='".$rows['name']."'>
                          <span class='radio-checkmark'></span>
                      </label>
                          
        ";
}
$content.="</form></div>";
echo $content;
?>	