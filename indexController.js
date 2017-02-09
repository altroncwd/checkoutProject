/* Controller
The controller is used to house all of our logical functions and manipulation of data
for this project we will place our requests and future filting here
*/

const Controller = function () {

	const checkOutDevice = function (deviceName, username){
		//for checking out a device
	};

	const checkInDevice = function (deviceName, username){
		//for checking in a device
		console.log(1);
	};

	const quickSwapDevice = function (deviceNub1, deviceNub2){
		//used to quickly swap one device for another
	};

	const renderCheckoutLogs = function (timeSpan){
		//used to display devices between Today, Week, All
		//temp, remove me when there is a db connection
    	/* let */dbList = ['apple', "banana", "orange"];

    	for(var i = 0; i < dbList.length; i++) {
    		
    		let display = "<pre class= 'col-md-4'>" + dbList[i] + "</pre>";
    		$("#deviceList").append(display);
    	}
	};

	const addNewDevice = function (deviceName, deviceModel, deviceOS){
		//for adding new devices to the device list
		let data = {
            action : "addDevice",
        	deviceName : deviceName,
        	deviceModel : deviceModel,
            deviceOS : deviceOS
        };

        alert(`Trying to add device : ${data.deviceName} : ${data.deviceModel}`);
        			
        $.post("server.php?", data, function (data){
			if (data === "Invalid query"){
                console.log("request failed : Duplicate device name");
                alert("Duplicate Devices Name");
                console.log(data);
            } else {
                console.log("request happened : " + data);
            }
		});

	};

	const updateDeviceInformation = function (deviceName) {
		// for updating device information 
	};


	return {
		checkOutDevice 		: 	checkOutDevice,
		checkInDevice 		: 	checkInDevice,
		quickSwapDevice 	: 	quickSwapDevice,
		renderCheckoutLogs 	: 	renderCheckoutLogs,
		addNewDevice		: 	addNewDevice,
		updateDeviceInformation	: updateDeviceInformation,
	};
};