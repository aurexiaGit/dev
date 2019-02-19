// connecting to etherscan api to get transaction history

var api = etherscanApi.init('NSAMUW521D6CQ63KHUPRQEERSW8FVRAF9B','rinkeby', '3000');

var transactionList

function getTransactionList(adress) {
	var txlist = api.account.tokentx(adress, '0xF2D4E64d5F3996B022532460510CF7e09e69C33D', 1, 'latest', 'desc');
	txlist.then(function(result) {
		transactionList=result.result
	})
} 

// create History

function createHistory() {
	var curAccount = "0x9cA10A8C595FFC15Ffa99B61d71Dc561e0aE1914"
	getTransactionList(curAccount)
	if (transactionList !== undefined) {
		var name
		var history = document.getElementById("history")
		history.innerHTML = ""
		transactionList.forEach(function(transactionSent) {
			if (curAccount.toLowerCase() === transactionSent.from.toLowerCase()) {
				for (var key in users) {
					if (users[key].adress.toLowerCase() === transactionSent.to.toLowerCase()) {
						name = users[key].name
					}
				}
				for (var key in charity) {
					if (charity[key].adress.toLowerCase() === transactionSent.to.toLowerCase()) {
						name = charity[key].name
					}
				}
				var posList = document.createElement("ul")
				posList.id = "sending"
				var notif = document.createElement("li")
				notif.innerHTML = "You sent <strong>" + (parseInt(transactionSent.value*Math.pow(10,-18))).toString() + " AST </strong> to <strong>" + name + "</strong>"
				posList.appendChild(notif)
				history.appendChild(posList)
			}
			if (curAccount.toLowerCase() === transactionSent.to.toLowerCase()) { 
				for (var key in users) {
					if (users[key].adress.toLowerCase() === transactionSent.from.toLowerCase()) {
						name = users[key].name
					}
				}
				if (transactionSent.from.toLowerCase() === ("0xF2D4E64d5F3996B022532460510CF7e09e69C33D").toLowerCase()) {
					name = "Aurexia Central Bank"
				}
				var negList = document.createElement("ul")
				negList.id = "receiving"
				var notif = document.createElement("li")
				notif.innerHTML = "You received <strong>" + (parseInt(transactionSent.value*Math.pow(10,-18))).toString() + " AST </strong> from <strong>" + name + "</strong>"
				negList.appendChild(notif)
				history.appendChild(negList)
			}
		})
	}	
}

var select = document.getElementById("dest-select")																																																																																																																																																																																																																																																																																																																																																																															

for (var key in users){
	if (users.hasOwnProperty(key)) {
		var opt = document.createElement('option');
	    opt.value = users[key].adress;
	    opt.innerHTML = users[key].name;
	    select.appendChild(opt);
	}
}

var Balance

function myBalance() {
	var curAccount = web3.eth.accounts[0]
	Token.balanceOf(curAccount, function(err,result) {
		if (!err) {Balance = parseInt(result*Math.pow(10,-18)) ; console.log("")}
	})
}

function getBalance(Account) {
	var Account = Account
	Token.balanceOf(this.Account, function(err,result) {
		if (!err) {Balance = result*Math.pow(10,-18) ; console.log("")}
	})
	return Balance
}


function createPage() {	
	myBalance()
	if (document.getElementById("astValue") !== undefined) {
		document.getElementById("astValue").innerHTML = Balance.toString() + " AST"	
	}
	window.setTimeout(function() {createHistory()},4500)
}


//window.setInterval(function() {
//	createPage()
//}, 1000);


function sendToken(adress,amount) {
	Token.transfer(adress,amount*Math.pow(10,18),function(err,result) {console.log("")})
}

function Transfer() {
	sendToken(document.getElementById("dest-select").value,document.getElementById("amount").value)
	var frm = document.getElementById("send");
	frm.reset();
	return false
}
