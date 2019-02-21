
function addMember() {
	// Called when clicking on Add button
	var address = document.getElementById("adress1").value
	var name = document.getElementById("name1").value
	Token.setMember(address,name,function(err,result) {console.log("")})
	var frm = document.getElementById("addMember");
	frm.reset();
	return false
}

function remMember() {
	// Called when clicking on remove button
	var address = document.getElementById("adress2").value
	Token.remMember(address,function(err,result) {console.log("")})
	var frm = document.getElementById("remMember");
	frm.reset();
	return false
}