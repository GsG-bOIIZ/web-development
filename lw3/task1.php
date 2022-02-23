<?php

$tempString = $_SERVER['QUERY_STRING'];
echo str_replace("%20", " ", $tempString);

?>