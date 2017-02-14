$(document).ready(function(){
    
	console.log("jQuery is working");

    $("#checkout.btn").click(function(){
        if( $("#checkout.deviceName").val() == "" ||
            $("#checkout.userName").val() == ""){
            alert("Please fill out all the required fields");
        } else {
            Controller().checkOutDevice(    $("#checkout.deviceName").val(),
                                            $("#checkout.userName").val()   )
                .done(function(returnValue){
                    if(returnValue.indexOf("Invalid update query :") > -1 ){
                        // replace with error popup?
                        alert("Something wen't wrong, check your device name");
                    } else {
                        // call a toaster?
                        $("#checkout.deviceName").val("");
                        $("#checkout.userName").val("");
                    }
                });

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
                console.log("|----| " + returnValue);
                console.log(returnValue.indexOf("invalid insert query"));
                if (returnValue.indexOf("invalid insert query") > -1 ){
                    alert("Unable to check in device, check device name");
                } else {
                    // call a toaster?
                    $("#checkin.deviceName").val("");
                    $("#checkin.userName").val("");
                }
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
                                        $("#newDevice.deviceOS").val()    )
                .done(function(returnValue){
                    //promis handler
                    if( returnValue.indexOf("Invalid query") > -1){
                        alert("Device failed to add, device name might already exist. Please check device names");
                    } else {
                        alert("Device Succesfully added");
                        $("#newDevice.deviceName").val("");
                        $("#newDevice.deviceModel").val("");
                        $("#newDevice.deviceOS").val("");
                    }
                });
        }

    });


    Controller().renderCheckoutLogs();

});