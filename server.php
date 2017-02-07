<?php
// Code for our PHP server.  We will only be using the php server because of its ease of setup

// ToDo:
// - Need to make a basic setup to test JS Ajax requests

// - Set up the skeleton for the basic AJAX Requests

// - Set up a DB Connection

// - Create a Basic CRUD server

// - Create a Swap device action 
	// we need to create a connection to the db, however we also want to make an easy setup that if there is no db existing, we make one and then try to reconnect 

	$dbConnection = mysqli_connect("localhost", "checkoutSystem", "");
	if (!$dbConnection){
		die('Could not connect: ' . mysql_error());
	} else {
		echo 'connection established </br>';
	}

	// ---- this checks to see if a table exists in -----
	// ---- possible future use -----
	// $tableName = 'deviceList';
	// $query = mysql_query("SELECT * FROM $tableName");
	// if(!$query){
    		// echo "The ". $tableName ." does not exists";
    		// createDeviceTable();
	// }

	

	// this is grabbing values from the url sent to this server
	// in this case we can use the ? to assign values which we look for
	if ( $_REQUEST['action'] == 'checkout'){
		$list = [ 	'deviceName' => $_REQUEST['deviceName'],
					'userName' => $_REQUEST['userName']];
		echo json_encode($list);
	}

	// if ( $_REQUEST['action'] == 'checkin'){

	// }

	// if ( $_REQUEST['action'] == 'swap'){

	// }

	// if ( $_REQUEST['action'] == 'remove'){

	// }

	// if ( $_REQUEST['action'] == 'edit'){

	// }

 ?>