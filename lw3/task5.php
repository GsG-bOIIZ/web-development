<?php

$_SERVER['QUERY_STRING'];
$email = $_GET['email'];

$email .= ".txt";
if ((file_exists($email)) and (strlen($email) >= 5))
{
	$tempArray = file($email);
	for ($i = 0; $i <= 4; $i++)
	{
		echo $tempArray[$i] . "<br />";
	}
}
?>