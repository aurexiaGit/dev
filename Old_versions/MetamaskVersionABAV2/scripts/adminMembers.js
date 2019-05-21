function addMember() {
	// Called when clicking on Add button
	var _address = document.getElementById("adress1").value
	var _name = document.getElementById("name1").value
	var _grade = document.getElementById ("grade1").value
	newMembre = {};
	newMembre.name = _name;
	newMembre.address = _address;
	newMembre.grade = _grade;
	Token.addToAurexiaMembers(_address,_name,_grade,function(err,result) {console.log("")})
	users[_name] = newMembre;
	var frm = document.getElementById("addMember");
	frm.reset();
	return false
}

function remMember() {
	// Called when clicking on remove button
	var address = document.getElementById("adress2").value
	Token.remAurexiaMembers(address,function(err,result) {console.log("")})
	var frm = document.getElementById("remMember");
	frm.reset();
	return false
}
