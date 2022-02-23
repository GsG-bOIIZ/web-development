<?php

$_SERVER['QUERY_STRING'];
$tempString = $_GET['identifier'];
$flag = true;

if ((is_numeric($tempString[0])) or (empty($tempString)))
{
	echo 'no';
	$flag = false;
} else
{
	while (!(empty($tempString[0])))
	{
		if ((is_numeric($tempString[0])) or (ctype_alpha($tempString[0])))
		{
			$tempString = substr($tempString, 1);
		} else 
		{
			echo 'no';
			$tempString = '';
			$flag = false;
		}
	} 
}
if ($flag) 
{
	echo 'yes';
}
?>