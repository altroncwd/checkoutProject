$(document).ready(function(){
    
	console.log("jQuery is working");

    $("#checkout").click(function(){
        alert("trying to check something out");
    });

    $("#checkin").click(function(){
        alert("Checking In");
        Controller().checkInDevice();
    });

    $("#swapdevices").click(function(){
        alert("Swaping Devices");
    });

    $("#addRemove").click(function(){
        
        if( $("#deviceName").val() == "" ||
            $("#deviceModel").val() == "" ||
            $("#deviceOS").val() == "" ){
            alert("Please fill out all the fields");
        } else {
            Controller().addNewDevice(  $("#deviceName").val(),
                                        $("#deviceModel").val(),
                                        $("#deviceOS").val()    );
        }

    });

    // const displayOutDevices = function (dbList) {

    // 	//temp, remove me when there is a db connection
    // 	/* let */dbList = ['apple', "banana", "orange"];

    // 	for(var i = 0; i < dbList.length; i++) {
    		
    // 		let display = "<pre class= 'col-md-4'>" + dbList[i] + "</pre>";
    // 		$("#deviceList").append(display);
    // 	}
    // }
    // displayOutDevices();

    Controller().renderCheckoutLogs();

});