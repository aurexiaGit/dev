

// Gets the selection panels from the page's form
var dest = document.getElementById("dest-select")																																																																																																																																																																																																																																																																																																																																																																															
var from = document.getElementById("from-select")

function addUsers() {
	// Adds the addresses to the panels with their name as innerHTML and thei address as value
	dest.innerHTML="<option value='' disabled selected>Select Beneficiary</option>"
	for (var key in users){
		if (users.hasOwnProperty(key)) {
			var opt = document.createElement('option');
		    opt.value = users[key].address;
		    opt.innerHTML = users[key].name;
		    dest.appendChild(opt);
		}
	}
	from.innerHTML="<option value='' disabled selected>Select Originator</option>"
	for (var key in users){
		if (users.hasOwnProperty(key)) {
			var opt = document.createElement('option');
		    opt.value = users[key].address;
		    opt.innerHTML = users[key].name;
		    from.appendChild(opt);
		}
	}
}

// The users list must be completed first (see users.js file) this is why we wait 10s before launching addUsers()
window.setTimeout(function() {addUsers()},10000)


function Transfer() {
	var addressFrom = document.getElementById("from-select").value
	var addressTo = document.getElementById("dest-select").value
	var amount = document.getElementById("amount").value
	Token.transferFrom(addressFrom,addressTo,amount*Math.pow(10,18),function(err,result) {console.log("")})
	var frm = document.getElementById("send");
	frm.reset();
	return false
}
