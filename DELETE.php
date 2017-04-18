<?php

	
	/*
	Things we need to do, and figure out how to do it

	X These actions will be made into buttons, we can set up automatic at a later time
	X - the db should be cleared out every two weeks? month?
	X 1. 
	X 2. 
	
	- grab information from our db, and write that to a csv file
	1. select all devices currently checked out
	2. select the last entry in the checkout log containing that device
	3. store the ID's of those checkout logs
	4. select all checkout logs, except for those ID's

	- save the csv file do the computer (desktop if possilbe)
	http://php.net/manual/en/function.fputcsv.php
	1. create an array with my db values
	2. create a new csv file with the date in the format
	3. write all the entries into the csv file

	- remove all those values from our db
		- should leave the last checkout entry for any devices still left out
		1. delete all entries from the checkout log except for entries that match the IDs we stored 


	*/

	if($_SERVER['REQUEST_METHOD'] === 'DELETE'){

	// get list of all devices still checked out (DEVICE LIST)
		//SELECT * FROM `deviceList` WHERE `status`='Checked Out'
		$result = mysqli_query($dbConnection, "SELECT * FROM 'deviceList' WHERE 'status' = 'Checked Out' ");


		// itterate through list and now select the last entry for each device (CHECKOUT LOGS)
			//SELECT * FROM `checkoutLog` WHERE `deviceName`='batmans' AND `inOrOut` = 'Out' ORDER BY `id` DESC LIMIT 1
		$lastEntryInList = Array();
		foreach ($results as $key => $device) {
			$lastEntryInList[] = mysqli_query($dbConnection, "SELECT * FROM 'checkoutLog' WHERE '" . $device[deviceName] . "' AND 'inOrOut' = 'Out' ORDER By 'id' DESC LIMIT 1");
		}

		// Delete all entries in CHECKOUT LOGS except for those records that match the id's
			//SELECT * FROM `checkoutLog` WHERE `id` NOT IN ( LIST OF id's)
		$deleteQuery = "DELETE * FROM 'checkoutLog' WHERE 'id' NOT IN ("
		foreach ($lastEntryInList as $key => $entries) {
			
		}

	}


?>