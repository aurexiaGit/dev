function newMember(adress) {
	Token.assignMember(adress,true,function(err,result) {console.log("")})
}

function addMember() {
	newMember(document.getElementById("adress1").value)
	var frm = document.getElementById("addMember");
	frm.reset();
	return false
}

function delMember(adress) {
	Token.assignMember(adress,false,function(err,result) {console.log("")})
}

function remMember() {
	delMember(document.getElementById("adress2").value)
	var frm = document.getElementById("remMember");
	frm.reset();
	return false
}