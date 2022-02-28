<?php

$_SERVER['QUERY_STRING'];
$password = $_GET['password'];
$length = strlen($password);

if (!(ctype_alnum($password)))
{
        echo "The string $password is not a password";
} else 
{
	$safety += 4 * $length;
	for ($i = 0; $i < $length; $i++) 
	{
		if (is_numeric($password[$i])) 
		{
			$n++;			
		}
	}
	$safety += $n * 4;
	$n = 0;
	for ($i = 0; $i < $length; $i++) 
	{
		if (ctype_upper($password[$i])) 
		{
			$n++;			
		}
	}
	if ($n != 0) 
	{
		$safety += ($length - $n) * 2;
	}
	$n = 0;
	for ($i = 0; $i < $length; $i++) 
	{
		if (ctype_lower($password[$i])) 
		{
			$n++;	
		}
	}
	if ($n != 0) 
	{
		$safety += ($length - $n) * 2;
	}
	$n = 0;
	if (ctype_alpha($password)) 
	{
		$safety -= $length;			
	}
	if (ctype_digit($password)) 
	{
		$safety -= $length;			
	}
	$result = count_chars($password);
	foreach ($result as $val) 
	{
		if ($val > 1) 
		{
			$safety -= $val;
		}
	}	
	echo "The safety of your password is $safety";
}		