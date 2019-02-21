
// connecting to etherscan api to get transaction history
var api = etherscanApi.init('NSAMUW521D6CQ63KHUPRQEERSW8FVRAF9B','rinkeby', '3000');


var transactionList

function getTransactionList(address) {
	// Gets the transaction list for a given address thanks to etherscan API
	var txlist = api.account.tokentx(address, '0xFF2f1d3683935cf110A9a4fc58A0BC9f9D09511f', 1, 'latest', 'desc');
	txlist.then(function(result) {
		transactionList=result.result
	})
} 

function createHistory() {
	// This function writes the users transactions onto the notification panel
	var curAccount = web3.eth.accounts[0]
	getTransactionList(curAccount)
	if (transactionList !== undefined) {
		var name
		var history = document.getElementById("history")
		history.innerHTML = ""
		transactionList.forEach(function(transactionSent) {
			// Gets the sent transactions
			if (curAccount.toLowerCase() === transactionSent.from.toLowerCase()) {
				for (var key in users) {
					if (users[key].address.toLowerCase() === transactionSent.to.toLowerCase()) {
						name = users[key].name
					}
				}
				var sentList = document.createElement("ul")
				sentList.id = "sending"
				var notif = document.createElement("li")
				notif.innerHTML = "You sent <strong>" + (parseInt(transactionSent.value*Math.pow(10,-18))).toString() + " AST </strong> to <strong>" + name + "</strong>"
				sentList.appendChild(notif)
				history.appendChild(sentList)
			}
			// Gets the recieved transactions
			if (curAccount.toLowerCase() === transactionSent.to.toLowerCase()) { 
				for (var key in users) {
					if (users[key].address.toLowerCase() === transactionSent.from.toLowerCase()) {
						name = users[key].name
					}
				}
				// Checks if it comes from the Central Bank (when it is minted)
				if (transactionSent.from.toLowerCase() === ("0xF2D4E64d5F3996B022532460510CF7e09e69C33D").toLowerCase()) {
					name = "Aurexia Central Bank"
				}
				var recList = document.createElement("ul")
				recList.id = "receiving"
				var notif = document.createElement("li")
				notif.innerHTML = "You received <strong>" + (parseInt(transactionSent.value*Math.pow(10,-18))).toString() + " AST </strong> from <strong>" + name + "</strong>"
				recList.appendChild(notif)
				history.appendChild(recList)
			}
		})
	}	
}

// Gets the selection panel from the page's form
var select = document.getElementById("dest-select")																																																																																																																																																																																																																																																																																																																																																																															

function addUsers() {
	// Adds the addresses to the panel with thei name as innerHTML and thei address as value
	select.innerHTML="<option value='' disabled selected>Select Beneficiary</option>"
	for (var key in users){
		if (users.hasOwnProperty(key)) {
			var opt = document.createElement('option');
		    opt.value = users[key].address;
		    opt.innerHTML = users[key].name;
		    select.appendChild(opt);
		}
	}
}

// The users list must be completed first (see users.js file) this is why we wait 10s before launching addUsers()
window.setTimeout(function() {addUsers()},10000)


var Balance

function myBalance() {
	// Gets the user's Balance
	var curAccount = web3.eth.accounts[0]
	Token.balanceOf(curAccount, function(err,result) {
		if (!err) {Balance = parseInt(result*Math.pow(10,-18)) ; console.log("")}
	})
}



function updateScreen() {
	// Gets the balance and updates the value on the screen.	
	myBalance()
	if (document.getElementById("astValue") !== undefined) {
		document.getElementById("astValue").innerHTML = Balance.toString() + " AST"	
	}
	//  Updates the history.
	createHistory()
}

updateScreen()

/* 
Supposedly this function updates automatically the screen. Fortmatic doesn't support the setInterval
function for the moment. They are working on this issue.

window.setInterval(function() {
	createPage()
}, 1000);
*/

function Transfer() {
	// Callesd when clicking on the send button
	var address = document.getElementById("dest-select").value
	var amount = document.getElementById("amount").value
	Token.transfer(address,amount*Math.pow(10,18),function(err,result) {console.log("")})
	var frm = document.getElementById("send");
	frm.reset(); // resets the form
	return false // prevents the page from refreshing
}
