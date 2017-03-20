<?php

	if($_SERVER['REQUEST_METHOD'] === 'POST'){
	

		if($_REQUEST["action"] == "checkOut"){

			$changeStatusQuery  = " UPDATE `deviceList` SET `status`= 'Checked Out' ";
			$changeStatusQuery .= " WHERE `deviceName` IN (" . $_REQUEST['deviceName'] . ")";
			$changeStatusQuery .= " AND `status` = 'available' ";

			echo "OHHH GOD";
			echo $_REQUEST['deviceName'];

			$results = mysqli_query($dbConnection, $changeStatusQuery);
			
			$deviceLogQuery  = "INSERT INTO `checkoutLog` (`deviceName`, `user`,`date`, `inOrOut`)";
			$deviceLogQuery .= "VALUES ('" . $_REQUEST['originList']  . "' ,";
			$deviceLogQuery .= "'" . $_REQUEST['userName'] . "' ,";
			$deviceLogQuery .= "'" . date("Y-m-d H:i:s") . "',";
			$deviceLogQuery .= "'Out' )";

			// checking fo the number of rows effected in the last query just in case values are off
			if(!mysqli_affected_rows($dbConnection)){
				die("Invalid update query :" . $changeStatusQuery);
			} else {
				// when a query suceeds its return value will be the number of rows effected
				$insertResults = mysqli_query($dbConnection, $deviceLogQuery);

				if(!$insertResults){
					die("invalid insert query" . mysql_error()); 
				} else{
					echo json_encode("Device records sent : " . $results);
				}
			}
		}

		if($_REQUEST["action"] === 'checkIn'){

			$changeStatusQuery  = " UPDATE `deviceList` SET `status`= 'available' ";
			$changeStatusQuery .= " WHERE `deviceName` IN (" . $_REQUEST['deviceName'] . ")";
			$changeStatusQuery .= " AND `status` = 'Checked Out' ";

			$results = mysqli_query($dbConnection, $changeStatusQuery);
			
			$deviceLogQuery  = "INSERT INTO `checkoutLog` (`deviceName`, `user`,`date`, `inOrOut`)";
			$deviceLogQuery .= "VALUES ('" . $_REQUEST['originList']  . "' ,";
			$deviceLogQuery .= "'" . $_REQUEST['userName'] . "' ,";
			$deviceLogQuery .= "'" . date("Y-m-d H:i:s") . "',";
			$deviceLogQuery .= "'In' )";

			// checking for the number of rows effected in the last query just in case values are off

			if(!mysqli_affected_rows($dbConnection)){
				die("Invalid update query :" . $changeStatusQuery);
			} else {
				// when a query suceeds its return value will be the number of rows effected
				$insertResults = mysqli_query($dbConnection, $deviceLogQuery);

				if(!$insertResults){
					die("invalid insert query" . mysql_error()); 
				} else{
					echo json_encode("Device records sent : " . $results);
				}
			}
		}


		if ($_REQUEST["action"] == "addDevice"){

			// create query
			$addDeviceQuery = "INSERT INTO `deviceList` (`id`, `deviceName`, `phoneModel`, `osVersion`, `status`, `deviceType`) ";
			$addDeviceQuery.= "VALUES (NULL, '" . $_REQUEST["deviceName"]; 			
			$addDeviceQuery.= "', '" . $_REQUEST["deviceModel"];
			$addDeviceQuery.= "', '" . $_REQUEST["deviceOS"];
			$addDeviceQuery.= "', 'available' ";
			$addDeviceQuery.= ", '" . $_REQUEST["deviceType"] . "')";

			$results = mysqli_query($dbConnection, $addDeviceQuery);
			if(!$results){
				die("Invalid query" . mysql_error());
			} else {
				echo json_encode("It worked : " . $results);
				// when a query suceeds it will be listed as 1
			}

		}

	}

?>