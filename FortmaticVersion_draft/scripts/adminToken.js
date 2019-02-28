

function createTokens() {
	// Creates tokens on an account
	var amount = document.getElementById("amount1").value
	var address = document.getElementById("adress1").value
	Token.mintToken(address,amount*Math.pow(10,-18),function(err,result) {console.log("")})
	var frm = document.getElementById("addMember");
	frm.reset();
	return false
}

function destroyTokens() {
	// Destroys tokens from an account
	var amount = document.getElementById("amount2").value
	var address = document.getElementById("adress2").value
	Token.burnFrom(address,amount*Math.pow(10,-18),function(err,result) {console.log("")})
	var frm = document.getElementById("supMember");
	frm.reset();
	return false
}