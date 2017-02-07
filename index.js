$(document).ready(function(){

	console.log("jQuery is working");

    $("#checkout").click(function(){
    	// grab deviceName and userName

    	let deviceName = "superman";
    	let userName = "Chris";

        let url = "/server.php?action=checkout";
        	url +="&deviceName=" + deviceName;
        	url +="&userName=" +userName;

        console.log("URL : " + url);

        $.ajax({
			url: url,
		  	success: function( result ) {
		    	console.log(result);
		  	}
		});
    });

    $("#checkin").click(function(){
        alert("Checking In");
    });

    $("#swapdevices").click(function(){
        alert("Swaping Devices");
    });

    $("#addRemove").click(function(){
        alert("AddRemoving devices");
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