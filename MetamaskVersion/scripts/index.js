
var eventSent = Token.Transfer()
var transactionSentList = []
eventSent.watch(function(error, result) {
 			if (!error) {
 				var curAccount = web3.eth.accounts[0];
 				transactionSentList.push(result);
 				if (curAccount.toLowerCase() === transactionSentList[transactionSentList.length-1].args.from.toLowerCase()) {
	 				sending=false;
	 				var elmt = document.getElementById("loading");
	 				elmt.innerHTML ="<br><div>Sent! </div><img src='images/checked.png'/>"
	 				window.setTimeout(function() {elmt.innerHTML =""},2000)
	 			}
 				console.log("");
 			}
 		})

function createHistory() {
	var curAccount = web3.eth.accounts[0]
	if (transactionSentList !== undefined) {
		var name
		var history = document.getElementById("history")
		history.innerHTML = ""
		transactionSentList.forEach(function(transactionSent) {
			if (curAccount.toLowerCase() === transactionSent.args.from.toLowerCase()) {
				for (var key in users) {
					if (users[key].adress.toLowerCase() === transactionSent.args.to.toLowerCase()) {
						name = users[key].name
					}
				}
				for (var key in charity) {
					if (charity[key].adress.toLowerCase() === transactionSent.args.to.toLowerCase()) {
						name = charity[key].name
					}
				}
				var posList = document.createElement("ul")
				posList.id = "sending"
				var notif = document.createElement("li")
				notif.innerHTML = "You sent <strong>" + (parseInt(transactionSent.args.value*Math.pow(10,-18))).toString() + " AST </strong> to <strong>" + name + "</strong>"
				posList.appendChild(notif)
				history.appendChild(posList)
			}
			if (curAccount.toLowerCase() === transactionSent.args.to.toLowerCase()) { 
				for (var key in users) {
					if (users[key].adress.toLowerCase() === transactionSent.args.from.toLowerCase()) {
						name = users[key].name
					}
				}
				if (transactionSent.args.from.toLowerCase() === ("0xe8311b299bad9432d714c6dba0150d89cb3aff36").toLowerCase()) {
					name = "Aurexia Central Bank"
				}
				var negList = document.createElement("ul")
				negList.id = "receiving"
				var notif = document.createElement("li")
				notif.innerHTML = "You received <strong>" + (parseInt(transactionSent.args.value*Math.pow(10,-18))).toString() + " AST </strong> from <strong>" + name + "</strong>"
				negList.appendChild(notif)
				history.appendChild(negList)
			}
		})
	}	
}

var select = document.getElementById("dest-select")																																																																																																																																																																																																																																																																																																																																																																															

for (var key in users){
	if (users.hasOwnProperty(key) && key !== "admin") {
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

function loading() {
	var elmt = document.getElementById("loading")
	if (sending) {
		elmt.innerHTML = "<br><div>Sending tokens </div><img src='images/Spinner-1s-40px.gif'/>"
	}
}

function createPage() {	
	loading()
	myBalance()
	if (document.getElementById("astValue") !== undefined) {
		document.getElementById("astValue").innerHTML = Balance.toString() + " AST"	
	}
	window.setTimeout(function() {createHistory()},4500)
}


window.setInterval(function() {
	createPage()
}, 1000);


function sendToken(adress,amount) {
	Token.transfer(adress,amount*Math.pow(10,18),function(err,result) {console.log("")})
}

function Transfer() {
	sending = true
	sendToken(document.getElementById("dest-select").value,document.getElementById("amount").value)
	var frm = document.getElementById("send");
	frm.reset();
	return false
}
