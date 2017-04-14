<?php

	
	if($_SERVER['REQUEST_METHOD'] === 'GET'){

		if ($_REQUEST["logs"] == "deviceInformation"){
			$getAllDeviceInfo = "SELECT * FROM `deviceList` ORDER BY deviceName";

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

		if ($_REQUEST["logs"] == "download"){
			// we want to get all entries and write them to a file
			$getCheckoutLogs = "SELECT * FROM `checkoutLog` ORDER BY date DESC";

			$results = mysqli_query($dbConnection, $getCheckoutLogs);

			// // make a file
			if (!$results) {
				die ("Failed to retrive checkout logs");
			} else {
				
				$fileName = date("m.d.y") . "Logs.csv";

				$newLog = fopen($fileName , 'w');
				fputcsv($newLog, Array('Devices', 'User Name', 'In / Out', 'Date', 'id'));
				
				foreach ($results as $key => $value) {
					fputcsv($newLog, $value);
				}

				fclose($newLog);
				echo $fileName . " created";
				// echo json_encode(getcwd());

			}
		}

	}


?>