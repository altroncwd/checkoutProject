/* Model view
This is the model view of our MVC
its responsible for housing all of your data 

NOTES:
Trying to figure out how to use an MVC style with jquery.
because of the separate files and the scope of $(document).ready() I cant simply join files or include them in the scrip
I think i will try to make my model/controller as global objects as they should not be dependant on the view
However I am reluctant to do so in a way that populates the global scope with these properties
Maybe wrapping all my models in a function which returns an object with methods will work similar to angular
  This does still mean one could access the the function from the global scope to get access to these methods though, but better then simple global values
*/

const StorageModel (){
	let deviceStorageAccess = {
		allDevices : "temp",
		allCheckoutLogs: "temp",
	};

	deviceStorageAccess.deviceInformation = function (){
		return {
			allDevices : this.allDevices
		};
	};

	deviceStorageAccess.deviceLogs = function (){
		return {
			allCheckoutLogs : this.allCheckoutLogs
		};
	};


	return {
		allDevices : StorageModel.deviceInformation(),
		deviceLogs : StorageModel.deviceLogs()
	};

}