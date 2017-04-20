<?php

	if($_SERVER['REQUEST_METHOD'] === 'POST'){
	

		if($_REQUEST["action"] == "checkOut"){

			$changeStatusQuery  = " UPDATE `deviceList` SET `status`= 'Checked Out' ";
			$changeStatusQuery .= " WHERE `deviceName` IN (" . $_REQUEST['deviceNames'] . ")";
			$changeStatusQuery .= " AND `status` = 'available' ";

			$results = mysqli_query($dbConnection, $changeStatusQuery);
			
			$deviceLogQuery  = "INSERT INTO `checkoutLog` (`deviceName`, `user`,`date`, `inOrOut`) VALUES ";
			
			// add multiple entries to our checkout log, 1 to 1 log entry (one device -> user)
			foreach ($_REQUEST['arrayList'] as $key => $device) {
				$deviceLogQuery .= "('" . $device  . "' ,";
				$deviceLogQuery .= "'" . $_REQUEST['userName'] . "' ,";
				$deviceLogQuery .= "'" . date("Y-m-d H:i:s") . "',";
				$deviceLogQuery .= "'Out' ),";
			}
			// removing the last , from the query
			$deviceLogQuery = rtrim($deviceLogQuery, ",");

			// checking fo the number of rows effected in the last query just in case values are off
			if(!mysqli_affected_rows($dbConnection)){
				die("Invalid update query :" . $changeStatusQuery);
			} else {
				// when a query suceeds its return value will be the number of rows effected
				$insertResults = mysqli_query($dbConnection, $deviceLogQuery);

				if(!$insertResults){
					die("invalid insert query :  ". $deviceLogQuery . mysql_error()); 
				} else{
					echo json_encode("Device records sent : " . $results);
				}
			}
		}

		if($_REQUEST["action"] === 'checkIn'){

			$changeStatusQuery  = " UPDATE `deviceList` SET `status`= 'available' ";
			$changeStatusQuery .= " WHERE `deviceName` IN (" . $_REQUEST['deviceNames'] . ")";
			$changeStatusQuery .= " AND `status` = 'Checked Out' ";

			$results = mysqli_query($dbConnection, $changeStatusQuery);
			
			$deviceLogQuery  = "INSERT INTO `checkoutLog` (`deviceName`, `user`,`date`, `inOrOut`) VALUES";
			
			foreach ($_REQUEST['arrayList'] as $key => $device) {
				$deviceLogQuery .= "('" . $device  . "' ,";
				$deviceLogQuery .= "'" . $_REQUEST['userName'] . "' ,";
				$deviceLogQuery .= "'" . date("Y-m-d H:i:s") . "',";
				$deviceLogQuery .= "'In' ),";
			}
			$deviceLogQuery = rtrim($deviceLogQuery, ",");

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



		//---------------------DELETE ACTION---------------------------


		if( $_REQUEST["action"] == "removeLogs") {
			/* get list of all devices still checked out (DEVICE LIST)
			   itterate through list and now select the last entry for each device (CHECKOUT LOGS)
			   UPDATE:
			   I have used a join + nested query to return me the list of checkout log id's in a single go
			*/

			$returnLogIds = "SELECT log.id ";
			$returnLogIds .="FROM checkoutLog log ";
			$returnLogIds .="INNER JOIN deviceList devi ON log.inOrOut = 'Out' ";
			$returnLogIds .="AND devi.status = 'Checked out' ";
			$returnLogIds .="AND log.deviceName = devi.deviceName ";
			$returnLogIds .="AND log.id = (SELECT id FROM checkoutLog ";
			$returnLogIds .="WHERE deviceName = devi.deviceName ";
			$returnLogIds .="AND inOrOut = 'Out' ";
			$returnLogIds .="ORDER BY id DESC LIMIT 1)";

			$listOfIds = mysqli_query($dbConnection, $returnLogIds);

			if (!$listOfIds) {
				die ("failed to get list of id's");
			} else {

				$exceptIds = "";
				foreach ($listOfIds as $key => $entry) {
					$exceptIds .= $entry['id'] . ",";
				}
				// remove the last , from the list and places them in ( )
				$exceptIds = "(" . rtrim($exceptIds, ",") . ")";
				// echo $exceptIds;
				// // Delete all entries in CHECKOUT LOGS except for those records that match the id's
				$deleteQuery = "DELETE FROM `checkoutLog` WHERE `id` NOT IN ";
				$deleteQuery .= $exceptIds;

				if (mysqli_query($dbConnection, $deleteQuery) ) {
					echo "Records have been cleared out";
				} else {
					echo "Failed to remove records" . $deleteQuery;
				}
			}
		}


	}

?>