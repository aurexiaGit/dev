
function mintTokens(adress,amount) {
	Token.mintToken(adress,parseInt(web3.toWei(amount.toString(),"ether")),function(err,result) {console.log("")})
}

function createTokens() {
	var amount = document.getElementById("amount1").value
	var adress = document.getElementById("adress1").value
	mintTokens(adress,amount,)
	var frm = document.getElementById("addMember");
	frm.reset();
	return false
}

function burnTokens(adress,amount) {
	Token.burnFrom(adress,parseInt(web3.toWei(amount.toString(),"ether")),function(err,result) {console.log("")})
}

function destroyTokens() {
	var amount = document.getElementById("amount2").value
	var adress = document.getElementById("adress2").value
	burnTokens(adress,amount)
	var frm = document.getElementById("supMember");
	frm.reset();
	return false
}