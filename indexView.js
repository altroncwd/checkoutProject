$(document).ready(function(){
    
	console.log("jQuery is working");

    $("#checkout.btn").click(function(){
        if( $("#checkout.deviceName").val() == "" ||
            $("#checkout.userName").val() == ""){
            alert("Please fill out all the required fields");
        } else {
            Controller().checkOutDevice(    $("#checkout.deviceName").val(),
                                                          $("#checkout.userName").val()   );

            // $.Get/post requests run acyn, meaning the parent function will finish before the request.  Will need to create a way to clear input fileds on succesfull resuets
        }
    });

    $("#checkin.btn").click(function(){
        if( $("#checkin.deviceName").val() == "" ||
            $("#checkin.userName").val() == "" ){
            alert("Please fill out all the required fields");
        } else {
            Controller().checkInDevice( $("#checkin.deviceName").val(),
                                        $("#checkin.userName").val()    )
            .done(function(returnValue){
                console.log("testing" + returnValue);
            })
        }
        // Controller().checkInDevice();
    });

    $("#swapdevices").click(function(){
        alert("Swaping Devices");
    });

    $("#addRemove").click(function(){
        // should I move this logic to the controller?
        if( $("#newDevice.deviceName").val() == "" ||
            $("#newDevice.deviceModel").val() == "" ||
            $("#newDevice.deviceOS").val() == "" ){
            alert("Please fill out all the fields");
        } else {
            Controller().addNewDevice(  $("#newDevice.deviceName").val(),
                                        $("#newDevice.deviceModel").val(),
                                        $("#newDevice.deviceOS").val()    );
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