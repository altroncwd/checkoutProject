<?php

	if($_SERVER['REQUEST_METHOD'] === 'POST'){
		// echo "WOHHH you got this far";
		// if ( $_REQUEST["action"] == "checkout"){
		// 	$list = [ 	"deviceName" => $_REQUEST["deviceName"],
		// 				"userName" => $_REQUEST["userName"]];
		// 	echo json_encode($list);
		// }

		if($_REQUEST["action"] == "checkOut"){
			// need to make a query to add to the checkoutLog
		}



		if ($_REQUEST["action"] == "addDevice"){

			// create query
			$addDeviceQuery = "INSERT INTO `deviceList` (`id`, `deviceName`, `phoneModel`, `osVersion`, `status`) ";
			$addDeviceQuery.= "VALUES (NULL, '" . $_REQUEST["deviceName"]; 			
			$addDeviceQuery.=	"', '" . $_REQUEST["deviceModel"];
			$addDeviceQuery.=	"', '" . $_REQUEST["deviceOS"] . "', 'available')";



			$results = mysqli_query($dbConnection, $addDeviceQuery);
			if(!$results){
				die("Invalid query" . mysql_error());
			} else {
				echo json_encode("It worked : " . $results);
				// when a query suceeds it will be listed as 1
			}

			// echo json_encode($list);

		}

	}

?>