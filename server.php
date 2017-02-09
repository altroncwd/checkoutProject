<?php

	$dbConnection = mysqli_connect("localhost", "root", "", "checkoutSystem");

	if (!$dbConnection){
		die('Could not connect: ' . mysql_error());
	}
	// else {
	// 	echo 'connection established';
	// }

	include "POST.php";
	
	include "GET.php";

	// if ( $_REQUEST['action'] == 'checkin'){

	// }

	// if ( $_REQUEST['action'] == 'swap'){

	// }

	// if ( $_REQUEST['action'] == 'remove'){

	// }

	// if ( $_REQUEST['action'] == 'edit'){

	// }

 ?>