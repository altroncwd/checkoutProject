$(document).ready(function(){
    
	console.log("jQuery is working");

    let controllMethods = Controller();


    //------------------------ Info Storage/Methods section ------------------
    let deviceStorageAccess = {
        allDevices : [],
        allCheckoutLogs: []
    };

    deviceStorageAccess.updateDeviceInformation = function (){
        return $.getJSON("server.php", {logs : "deviceInformation"})
            .done(function(returnValue){
                deviceStorageAccess.allDevices = returnValue;
            });
    };

    deviceStorageAccess.updateDeviceLogs = function (){
        // we know our db is sending us JSON so we use getJSON rather than get
        return $.getJSON("server.php", {logs : "checkoutLogs"})
            .done(function(returnValue){
                deviceStorageAccess.allCheckoutLogs = returnValue;
            });
    };


    // deviceStorageAccess.retreiveAllDeviceInfo = function (){
    //     return this.allDevices;
    // };

    // deviceStorageAccess.retreiveAllDeviceLogs = function (){
    //     return this.allCheckoutLogs;
    // };














    $("#checkout.btn").click(function(){
        if( $("#checkout.deviceName").val() == "" ||
            $("#checkout.userName").val() == ""){
            alert("Please fill out all the required fields");
        } else {
            controllMethods.checkOutDevice( $("#checkout.deviceName").val(),
                                            $("#checkout.userName").val()   )
                .done(function(returnValue){
                    if(returnValue.indexOf("Invalid update query :") > -1 ){
                        // replace with error popup?
                        alert("Something wen't wrong, check your device name");
                    } else {
                        // call a toaster?
                        // $("#checkout.deviceName").val("");
                        // $("#checkout.userName").val("");
                        window.location.reload()
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
            controllMethods.checkInDevice(  $("#checkin.deviceName").val(),
                                            $("#checkin.userName").val()    )
            .done(function(returnValue){
                console.log(returnValue.indexOf("invalid insert query"));
                if (returnValue.indexOf("invalid insert query") > -1 ){
                    // replace with error popup?
                    alert("Unable to check in device, check device name");
                } else {
                    // call a toaster?
                    // $("#checkin.deviceName").val("");
                    // $("#checkin.userName").val("");
                    window.location.reload()
                }
            })
        }

    });

    $("#swapdevices").click(function(){

    });

    $("#addRemove").click(function(){
        // should I move this logic to the controller?
        if( $("#newDevice.deviceName").val() == "" ||
            $("#newDevice.deviceModel").val() == "" ||
            $("#newDevice.deviceOS").val() == "" ){
            alert("Please fill out all the fields");
        } else {
            controllMethods.addNewDevice(   $("#newDevice.deviceName").val(),
                                            $("#newDevice.deviceModel").val(),
                                            $("#newDevice.deviceOS").val()    )
                .done(function(returnValue){
                    //promis handler
                    if( returnValue.indexOf("Invalid query") > -1){
                        alert("Device failed to add, device name might already exist. Please check device names");
                    } else {
                        // alert("Device Succesfully added");
                        // $("#newDevice.deviceName").val("");
                        // $("#newDevice.deviceModel").val("");
                        // $("#newDevice.deviceOS").val("");
                        window.location.reload()
                    }
                });
        }

    });



    // ---------- CheckOutModal-----------
    $("#checkOutModal").click(function() {
        $(".modal1").css("display", "block");
    });
    $('.modal1').click(function(event){
        // this is checking to make sure its the primary element, and not the children/parents
        if (event.target == this){
            $(".modal1").css("display", "none");
        }
    });
    $(".modal1 .close").click(function(){
        $(".modal1").css("display", "none");
    });
    // ---------- CheckInModal-----------
    $("#checkInModal").click(function() {
        $(".modal2").css("display", "block");
    });
    $('.modal2').click(function(event){
        if (event.target == this){
            $(".modal2").css("display", "none");
        }
    });
    $(".modal2 .close").click(function(){
        $(".modal2").css("display", "none");
    });
    // ---------- DeviceModal-----------
    $("#newDeviceModal").click(function() {
        $(".modal3").css("display", "block");
    });
    $('.modal3').click(function(event){
        if (event.target == this){
            $(".modal3").css("display", "none");
        }
    });
    $(".modal3 .close").click(function(){
        $(".modal3").css("display", "none");
    });








    deviceStorageAccess.updateDeviceLogs()
        .done(function(){
            controllMethods.renderCheckoutLogs(deviceStorageAccess.allCheckoutLogs);
        });
    deviceStorageAccess.updateDeviceInformation()
        .done(function(){
            controllMethods.renderDeviceList(deviceStorageAccess.allDevices);
            console.log(deviceStorageAccess.allDevices);
            controllMethods.renderAvailibleDevices(deviceStorageAccess.allDevices);
        });




});











