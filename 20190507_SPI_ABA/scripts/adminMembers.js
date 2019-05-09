const resetAdd = () => {
	var frm = document.getElementById("addMember");
	frm.reset();
}

const addMember = async () => {
	// Called when clicking on Add button
	var _address = document.getElementById("adress1").value
	var _name = document.getElementById("name1").value
	var _grade = document.getElementById ("grade1").value

	Token.addToAurexiaMembers(_address,_name,_grade,(err,result) => {console.log(result)})
	var frm = document.getElementById("remMember");
	frm.reset();
	return true;
}

function remMember() {
	// Called when clicking on remove button
	var address = document.getElementById("adress2").value
	Token.remAurexiaMembers(address,function(err,result) {console.log("")})
	var frm = document.getElementById("remMember");
	frm.reset();
	return false
}
