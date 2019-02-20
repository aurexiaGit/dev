function newMember(adress,name) {
	Token.setMember(adress,name,function(err,result) {console.log("")})
}

function addMember() {
	newMember(document.getElementById("adress1").value,document.getElementById("name1").value)
	var frm = document.getElementById("addMember");
	frm.reset();
	return false
}

function delMember(adress) {
	Token.remMember(adress,function(err,result) {console.log("")})
}

function remMember() {
	delMember(document.getElementById("adress2").value)
	var frm = document.getElementById("remMember");
	frm.reset();
	return false
}