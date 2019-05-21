function createTokens() {
	// Creates tokens on an account
	var amount = document.getElementById("amount1").value
	var address = document.getElementById("adress1").value
	Token.mint(address,amount*Math.pow(10,-18),function(err,result) {console.log("")})
	var frm = document.getElementById("addMember");
	frm.reset();
}

function destroyTokens() {
	// Destroys tokens from an account
	var amount = document.getElementById("amount2").value
	var address = document.getElementById("adress2").value
	Token.burn(address,amount*Math.pow(10,-18),function(err,result) {console.log("")})
	var frm = document.getElementById("supMember");
	frm.reset();
}