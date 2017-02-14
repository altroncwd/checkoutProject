/* Controller
The controller is used to house all of our logical functions and manipulation of data
for this project we will place our requests and future filting here
*/

const Controller = function () {

	const checkOutDevice = function (deviceName, userName){
		//for checking out a device
		let checkoutData = {
			action : "checkOut",
			deviceName : deviceName,
			userName : userName
		};
		
		return $.post("server.php", checkoutData);

	};

	const checkInDevice = function (deviceName, userName){
		let checkoutData = {
			action : "checkIn",
			deviceName : deviceName,
			userName : userName,
		};

		return $.post("server.php", checkoutData);
	};

	const quickSwapDevice = function (deviceNub1, deviceNub2){
		//used to quickly swap one device for another
	};

	const renderCheckoutLogs = function (timeSpan){
		//used to display devices between Today, Week, All
		//temp, remove me when there is a db connection
    	let dbList = ['apple', "banana", "orange"];
    	console.log(" *A* ......" + StorageModel().retreiveAllDeviceLogs());
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
        			
        return $.post("server.php", data);

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