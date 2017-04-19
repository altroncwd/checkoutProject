$(document).ready(function(){
    
	console.log("jQuery is working");

    let controllMethods = Controller();

    //------------------------ Info Storage/Methods section ------------------
    let deviceStorageAccess = {
        allDevices : [],
        allCheckoutLogs: [],
        checkedInDevices: [],
        checkedOutDevices: [], 
        selectedList: [],
        adminFlag: 0,
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


    $(".hiddenAdmin").click(function(){
        deviceStorageAccess.adminFlag ++;
        if (deviceStorageAccess.adminFlag % 5 == 4) {
            $(".admin").toggle();
        }
    });


    const resetInputs = function () {
        $("input").val("Name");
        $(".deviceName").val("Device Name");
        $(".deviceModel").val("Device Model");
        $(".deviceOS").val("Device OS");
        $(".deviceType").val("iOS/Android/Kindle");
    };



    //  ----------------- "ADMIN BUTTONS" ------------------
    $("#addDevice").click(function(){
        // should I move this logic to the controller?
        if( $("#newDevice.deviceName").val() == "" ||
            $("#newDevice.deviceModel").val() == "" ||
            $("#newDevice.deviceOS").val() == "" ||
            $("#newDevice.deviceType").val() == "Choose a platform" || 
            $("newDevice.deviceName").val() == "Device Name" ||
            $("newDevice.deviceModel").val() == "Device Model" ||
            $("newDevice.deviceOS").val() == "Device OS" ){
            alert("Please fill out all the fields");
        } else {
            controllMethods.addNewDevice(   $("#newDevice.deviceName").val(),
                                            $("#newDevice.deviceModel").val(),
                                            $("#newDevice.deviceOS").val(),
                                            $("#newDevice.deviceType").val()    )
                .done(function(returnValue){
                    //promis handler
                    if( returnValue.indexOf("Invalid query") > -1){
                        alert("Device failed to add, device name might already exist. Please check device names");
                    } else {
                        window.location.reload();
                    }
                });
        }

    });

    $("#dlLogs").click(function(){
        controllMethods.dlLogs(false);
    });

    $("#cleanupDB").click(function(){
        controllMethods.dlLogs(true);
    });

    

    // ---------- CheckOutModal-----------
    $("#checkOutModal").click(function() {
        $(".modal1").css("display", "block");
    });
    $('.modal1').click(function(event){
        // this is checking to make sure its the primary element, and not the children/parents
        if (event.target == this){
            $(".modal1").css("display", "none");
            controllMethods.renderAvailibleDevices(deviceStorageAccess);
            resetInputs();
        }
    });
    $(".modal1 .close").click(function(){
        $(".modal1").css("display", "none");
        controllMethods.renderAvailibleDevices(deviceStorageAccess);
        resetInputs();
    });
    $(".modal1 .submit").click(function(){
        let userName = $(".modal1 input").val();

        // check for name too
        if (userName !== "Name" && userName.length > -1 && deviceStorageAccess.selectedList.length > -1) {
             controllMethods.checkOutDevice( deviceStorageAccess.selectedList,
                                             userName )
                .done(function(returnValue){
                    console.log("==" , returnValue);
                    if(returnValue.indexOf("Invalid update query :") > -1 ){
                        // replace with error popup?
                        alert("Something wen't wrong, check your device name");
                    } else {
                        // call a toaster? 
                        window.location.reload()
                        // console.log('devices checked out, manually refresh to see changes, uncomment when finished with dev');
                    }
                });
        }
    })
    


    // ---------- CheckInModal-----------
    $("#checkInModal").click(function() {
        $(".modal2").css("display", "block");
    });
    $('.modal2').click(function(event){
        if (event.target == this){
            $(".modal2").css("display", "none");
            controllMethods.renderAvailibleDevices(deviceStorageAccess);
            resetInputs();
        }
    });
    $(".modal2 .close").click(function(){
        $(".modal2").css("display", "none");
        controllMethods.renderAvailibleDevices(deviceStorageAccess);
        resetInputs();
    });
    $(".modal2 .submit").click(function() {
        let userName = $(".modal2 input").val();

        if (userName !== "Name" && userName.length > -1 && deviceStorageAccess.selectedList.length > -1) {
            controllMethods.checkInDevice(  userName,
                                            deviceStorageAccess.selectedList)
            .done(function(returnValue){

                if (returnValue.indexOf("invalid insert query") > -1 ){
                    // replace with error popup?
                    alert("Unable to check in device, check device name");
                } else {
                    // call a toaster?
                    window.location.reload()
                    // console.log('devices checked in, manually refresh to see changes, uncomment when finished with dev');
                }
            })
        }

    });



    // ---------- DeviceModal-----------
    $("#newDeviceModal").click(function() {
        $(".modal3").css("display", "block");
    });
    $('.modal3').click(function(event){
        if (event.target == this){
            $(".modal3").css("display", "none");
            resetInputs();
        }
    });
    $(".modal3 .close").click(function(){
        $(".modal3").css("display", "none");
        resetInputs();
    });


    $(".devicesAvailible").on("click", "button", function(){
        let deviceName = $(this).attr("checkList");
        deviceStorageAccess.selectedList.push( deviceName );
        $(".checkoutList").append($(this));

    });

    $(".devicesOut").on("click", "button", function(){
        let deviceName = $(this).attr("checkList");
        deviceStorageAccess.selectedList.push( deviceName );
        $(".checkoutList").append($(this));
    });

    $(".checkoutList").on("click", "button", function(){
        let deviceName = $(this).attr("checkList");
        // remove from list
        let possition = deviceStorageAccess.selectedList.indexOf(deviceName);
        deviceStorageAccess.selectedList.splice(possition, 1);
        if ( $(this).parent().attr("inOrOut") === "In") {
            $(".devicesOut").append($(this));
        } else {
            $(".devicesAvailible").append($(this));
        }

        

    });


    deviceStorageAccess.updateDeviceLogs()
        .done(function(){
            controllMethods.renderCheckoutLogs(deviceStorageAccess.allCheckoutLogs);
        });
    deviceStorageAccess.updateDeviceInformation()
        .done(function(){
            controllMethods.renderDeviceList(deviceStorageAccess.allDevices);
            // separate deices into two lists
            controllMethods.separateDeviceList( deviceStorageAccess);
            controllMethods.renderAvailibleDevices(deviceStorageAccess);
            // console.log(deviceStorageAccess);
        });



});









