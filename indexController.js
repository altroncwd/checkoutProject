/* Controller
The controller is used to house all of our logical functions and manipulation of data
for this project we will place our requests and future filting here
*/

const Controller = function () {

	const checkOutDevice = function (deviceName, userName){
		//for checking out a device

		let checkoutData = {
			action : "checkOut",
			deviceName : "'" + deviceName.join("', '") + "'",
			userName : userName,
			originList : deviceName.join(', '),
		};

		return $.post("server.php", checkoutData);

	};

	const checkInDevice = function (userName, deviceName){

		let checkoutData = {
			action : "checkIn",
			deviceName : deviceName.join("', '"),
			userName : userName,
			originList : deviceName.join(', '),
		};
		console.log(checkoutData);
		return $.post("server.php", checkoutData);
	};

	const quickSwapDevice = function (deviceNub1, deviceNub2){
		//used to quickly swap one device for another
	};

	const renderCheckoutLogs = function (list, timeSpan){
		//used to display devices between Today, Week, All
		//temp, remove me when there is a db connection
    	let dbList = list;
    	for(var i = 0; i < dbList.length; i++) {
    		let log = dbList[i];
    		let display = 	`<div class= "col-md-10 col-md-offset-1">
    						<div class= "col-md-3"> ${log.deviceName} </div>
    						<div class= "col-md-3"> ${log.user} </div>
    						<div class= "col-md-3 ${log.inOrOut}"> ${log.inOrOut} </div>
    						<div class= "col-md-3"> ${log.date} </div>`;
    		$("#checkoutLogs").append(display);
    	}
	};

	const renderDeviceList = function (list){
		let deviceList = list;
		for (var i = 0; i < deviceList.length; i++) {
			let device = deviceList[i];
			let display = 	`<div class= "col-md-10 col-md-offset-1">
							<div class="col-md-3"> ${device.deviceName} </div>
							<div class="col-md-3"> ${device.phoneModel} </div>
							<div class="col-md-3"> ${device.osVersion} </div>
							<div class="col-md-3 ${device.status}"> ${device.status} </div>`;
			$("#deviceStatus").append(display);
		}
	};

	const separateDeviceList = function (localList) {
		
		for (var i = 0; i < localList.allDevices.length; i++ ) {
			if ( localList.allDevices[i].status === "available") {
				localList.checkedInDevices.push( localList.allDevices[i]);
			} else if (localList.allDevices[i].status === "Checked Out") {
				localList.checkedOutDevices.push( localList.allDevices[i]);
			}
		}		
		
	};

	const renderAvailibleDevices = function (list){

		// clear any existing lists
		$(".deviceButtons").remove();
		// we also clear out the checklist to make sure its in a set state
		list.selectedList = [];

		let devicesIn = list.checkedInDevices;
		let devicesOut = list.checkedOutDevices;

		for (var i = 0; i < devicesIn.length; i++ ) {
			$(".devicesAvailible").append( `<button class="btn btn-success deviceButtons" checkList="${devicesIn[i].deviceName}" > &times; ${devicesIn[i].deviceName} </button>`);
		}

		for (var j = 0; j < devicesOut.length; j++) {
			$(".devicesOut").append(`<button class="btn btn-success deviceButtons" checkList="${devicesOut[j].deviceName}" > &times; ${devicesOut[j].deviceName} </button>`);
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
		renderDeviceList 	: 	renderDeviceList,
		renderAvailibleDevices : renderAvailibleDevices,
		separateDeviceList : separateDeviceList,
	};
};