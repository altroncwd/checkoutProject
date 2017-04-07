<?php

	$dbConnection = mysqli_connect("localhost", "root", "", "checkoutSystem");

	if (!$dbConnection){
		die('Could not connect: ' . mysql_error());
	}

	// we use this to set our time by default ot West coast
	date_default_timezone_set('America/Los_Angeles');
	// else {
	// 	echo 'connection established';
	// }

	include "POST.php";
	
	include "GET.php";

	include "DELETE.php";

 ?>