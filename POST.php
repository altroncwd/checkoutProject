<?php

	if($_SERVER['REQUEST_METHOD'] === 'POST'){
		// echo "WOHHH you got this far";
		// if ( $_REQUEST["action"] == "checkout"){
		// 	$list = [ 	"deviceName" => $_REQUEST["deviceName"],
		// 				"userName" => $_REQUEST["userName"]];
		// 	echo json_encode($list);
		// }

		if ($_REQUEST["action"] == "addDevice"){

			// create query
			$queryRequest = "INSERT INTO `deviceList` (`id`, `deviceName`, `phoneModel`, `osVersion`, `status`) ";
			$queryRequest.= "VALUES (NULL, '" . $_REQUEST["deviceName"]; 			
			$queryRequest.=	"', '" . $_REQUEST["deviceModel"];
			$queryRequest.=	"', '" . $_REQUEST["deviceOS"] . "', 'available')";



			$results = mysqli_query($dbConnection, $queryRequest);
			if(!$results){
				die("Invalid query" . mysql_error());
			} else {
				echo json_encode("It worked : " . $results);
			}

			// echo json_encode($list);

		}

	}

?>