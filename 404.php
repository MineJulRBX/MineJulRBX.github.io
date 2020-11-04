<?php

$tdir=getdir($_SERVER['REQUEST_URI']);

if($tdir != false) {
  header("HTTP/1.1 301 Moved Permanently");
  header( 'Location: https://minejulrbx.github.io'.$tdir );

} else {
  die('<html>
  <head>
    <title>404 - Site Was Not Found</title>
  </head>
  <body>
    <p></p>
    <n></n>
    <img src="https://MineJulRBX.github.io/Images/404.png" alt="Smiley face" height="103" width="178">
     <input type="button" onclick="location.href='https://MineJulRBX.github.io/';" value="Homepage" />
    <button onclick="goBack()">Go Back</button>

<script>
function goBack() {
    window.history.back();
}
</script>
  </body>
</html>');

}

function getdir($tfile) {
  $startloc="/Projects".dirname($tfile);

  if (file_exists($startloc) && $handle = opendir($startloc)) {
    while (false !== ($file = readdir($handle))) {
      if ($file != "." && $file != ".." && strcasecmp($file,basename($tfile))==0) {            
        return dirname($tfile).DIRECTORY_SEPARATOR.$file;
      }
    }
    closedir($handle);
  }
  return false;
}
?>
