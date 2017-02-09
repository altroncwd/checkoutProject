/* Controller
The controller is used to house all of our logical functions and manipulation of data
for this project we will place our requests and future filting here
*/

const Controller () {

	const checkOutDevice = function (deviceName, username){
		//for checking out a device
	};

	const checkInDevice = function (deviceName, username){
		//for checking in a device
	};

	const quickSwapDevice = function (deviceNub1, deviceNub2){
		//used to quickly swap one device for another
	};

	const renderCheckoutLogs = function (timeSpan){
		//used to display devices between Today, Week, All
	};

	const addNewDevice = function (deviceName, phoneModel, osVersion){
		//for adding new devices to the device list
	};

	const updateDeviceInformation = function (deviceName) {
		// for updating device information 
	}


	return {
		checkOutDevice 		: 	checkOutDevice(),
		checkInDevice 		: 	checkInDevice(),
		quickSwapDevice 	: 	quickSwapDevice(),
		renderCheckoutLogs 	: 	renderCheckoutLogs(),
		addNewDevice		: 	addNewDevice(),
		updateDeviceInformation	: updateDeviceInformation(),
	};
}