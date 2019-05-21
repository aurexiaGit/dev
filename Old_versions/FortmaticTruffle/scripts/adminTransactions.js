
// Prevent admin from quitting page and loose global history
window.onbeforeunload = function(){
  return 'ATTENTION - Are you sure you want to quit? You will reset the History.';
};

// connecting to etherscan api to get transaction history
var api = etherscanApi.init('NSAMUW521D6CQ63KHUPRQEERSW8FVRAF9B','rinkeby', '3000');


var transactionList

function getTransactionList(address) {
	// Gets the transaction list for a given address thanks to etherscan API
	var txlist = api.account.txlist('0xFF2f1d3683935cf110A9a4fc58A0BC9f9D09511f', 1, 'latest', 1, 100, 'desc');
	txlist.then(function(result) {
		transactionList=result.result
	})
} 

function createHistory() {
	var curAccount = web3.eth.accounts[0]
	if (transactionList !== undefined) {
		var reciever
		var sender
		var history = document.getElementById("history")
		history.innerHTML = ""
		transactionList.forEach(function(transactionSent) {
			if (transactionSent.args.from.toLowerCase() !== ("0x0000000000000000000000000000000000000000").toLowerCase()) {
				for (var key in users) {
					if (users[key].address.toLowerCase() === transactionSent.args.to.toLowerCase()) {
						reciever = users[key].name
					}
					if (users[key].address.toLowerCase() === transactionSent.args.from.toLowerCase()) {
						sender = users[key].name
					}
					if (transactionSent.args.from.toLowerCase() === ("0xFF2f1d3683935cf110A9a4fc58A0BC9f9D09511f").toLowerCase()) {
						sender = "Aurexia Central Bank"
					}
				}
				for (var key in charity) {
					if (charity[key].address.toLowerCase() === transactionSent.args.to.toLowerCase()) {
						reciever = charity[key].name
					}
				}
				var posList = document.createElement("ul")
				posList.id = "sending"
				var notif = document.createElement("li")
				notif.innerHTML = "<strong>" + sender + "</strong> sent <strong>" + (parseInt(transactionSent.args.value*Math.pow(10,-18))).toString() + " AST </strong> to <strong>" + reciever + "</strong>"
				posList.appendChild(notif)
				history.appendChild(posList)
				document.getElementById("sending").style.listStyleImage = "url('../images/transaction.png')"
			}
		})
	}	
}

window.setInterval(function() {createHistory()},4500)