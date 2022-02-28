<?php

$_SERVER['QUERY_STRING'];
$firstName = $_GET['first_name'];
$lastName = $_GET['last_name'];
$email = $_GET['email'];
$age = $_GET['age'];

$email .= ".txt";
if (strlen($email) - 4 != 0)
{
	if (file_exists($email))
	{
		$tempArray = file($email);
		if (!(empty($firstName)))
		{
			$tempArray[0] = "First Name: " . $firstName . "\n";
		}
		if (!(empty($lastName)))
		{
			$tempArray[1] = "Last Name: " . $lastName . "\n";
		}
		if (!(empty($lastName)))
		{
			$tempArray[2] = "Email: " . substr($email, 0, -4) . "\n";
		}
		if (!(empty($age)))
		{
			$tempArray[3] = "Age: " . $age;
		}
		file_put_contents($email, $tempArray);
	} else
	{
		$userTxt = fopen($email, "w");
		fwrite($userTxt, "First Name: ");
		fwrite($userTxt, $firstName . "\n");
		fwrite($userTxt, "Last Name: ");
		fwrite($userTxt, $lastName . "\n");
		fwrite($userTxt, "Email: ");
		fwrite($userTxt, substr($email, 0, -4) . "\n");
		fwrite($userTxt, "Age: ");
		fwrite($userTxt, $age);

		fclose($userTxt);
	}
}
?>