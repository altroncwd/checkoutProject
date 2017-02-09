$(document).ready(function(){

	console.log("jQuery is working");

    $("#checkout").click(function(){
        alert("trying to check something out");
    });

    $("#checkin").click(function(){
        alert("Checking In");
    });

    $("#swapdevices").click(function(){
        alert("Swaping Devices");
    });

    $("#addRemove").click(function(){

        let data = {
            action : "addDevice",
        	deviceName : $("#deviceName").val(),
        	deviceModel : $("#deviceModel").val(),
            deviceOS : $("#deviceOS").val()
        };

        alert(`Trying to add device : ${data.deviceName} : ${data.deviceModel}`);
        			
        $.post("server.php?", data, function (data){
			if (data === "Invalid query"){
                console.log("request failed : Duplicate device name");
                alert("Duplicate Devices Name");
            } else {
                console.log("request happened : " + data)
            }
		});
    });

    const displayOutDevices = function (dbList) {

    	//temp, remove me when there is a db connection
    	/* let */dbList = ['apple', "banana", "orange"];

    	for(var i = 0; i < dbList.length; i++) {
    		
    		let display = "<pre class= 'col-md-4'>" + dbList[i] + "</pre>";
    		$("#deviceList").append(display);
    	}
    }
    displayOutDevices();
});