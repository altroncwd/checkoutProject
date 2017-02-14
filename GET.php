<?php

	
	if($_SERVER['REQUEST_METHOD'] === 'GET'){

		if ($_REQUEST["logs"] == "deviceInformation"){
			$getAllDeviceInfo = "SELECT * FROM `deviceList`";

			$results = mysqli_query($dbConnection, $getAllDeviceInfo);

			if(!$results){
				die("Failed to retrive device information");
			} else {
				// echo json_encode($results);
				$deviceInfoReturn = array();
				while($rows = mysqli_fetch_assoc($results)){
					$deviceInfoReturn[] = $rows;
				}
				print json_encode($deviceInfoReturn);
			}
		}

		if ($_REQUEST["logs"] == "checkoutLogs"){
			$getCheckoutLogs = "SELECT * FROM `checkoutLog`";

			$results = mysqli_query($dbConnection, $getCheckoutLogs);

			if(!$results){
				die("Failed to retrive device information");
			} else {
				// echo json_encode($results);
				$deviceInfoReturn = array();
				while($rows = mysqli_fetch_assoc($results)){
					$deviceInfoReturn[] = $rows;
				}
				print json_encode($deviceInfoReturn);
			}

		}

	}


?>