
var select = document.getElementById("dest-select")

var Balance

function myBalance() {
	var curAccount = web3.eth.accounts[0]
	Token.balanceOf(curAccount, function(err,result) {
		if (!err) {Balance = result*Math.pow(10,-2) ; console.log("")}
	})
}


function sendToken(adress,amount) {
	Token.transfer(adress,parseInt(web3.toWei(amount.toString(),"ether")),function(err,result) {console.log("")})
}

function Transfer() {
	myBalance()
	sendToken(document.getElementById("dest-select").value,Balance)
	var frm = document.getElementById("donate");
	frm.reset();
	return false
}

function createPage() {
	myBalance()
	if (document.getElementById("astValue") !== undefined) {
		document.getElementById("astValue").innerHTML = Balance.toString() + " AST"	
	}
}


window.setInterval(function() {
	createPage()
}, 1000);


// burn et burn tokens ne sont pas utiles pour le moment, sauf pour détruire ses propres token depuis la console JS. 
// En revanche, il faudrait changer le smart contrat pour que l'admin puisse détruire les tokens de quelqu'un d'autre

function burnTokens() {
	myBalance()
	Token.burn(parseInt(web3.toWei(Balance.toString(),"ether")),function(err,result) {console.log("")})
}

function Burn() {
	burnTokens()
	var frm = document.getElementById("donate");
	frm.reset();
	return false
}