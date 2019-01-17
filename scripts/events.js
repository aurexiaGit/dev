
var sending = false 

function homePage() {
	window.location="index.html"
}

function adminPage() {
	window.location="admin.html"
}

function eventsPage() {
	window.location="events.html"
}

function donationPage() {
	window.location="donation.html"
}

function aurexiaQuiz() {
	window.location="eventsInit.html"
}

document.getElementById("adminPage").style.display = "none"

if (window.ethereum===undefined) {
	if(window.confirm('You need to use google Chrome and have Metamask installed ! Click "ok" to start dowloading.')) 
		{
		window.location.href='https://metamask.io';
	}
}
else {
		window.ethereum
		ethereum.enable()
}



var web3 = new Web3(web3.currentProvider)

var TokenABI = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "newSellPrice",
				"type": "uint256"
			},
			{
				"name": "newBuyPrice",
				"type": "uint256"
			}
		],
		"name": "setPrices",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "initialSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sellPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "target",
				"type": "address"
			},
			{
				"name": "mintedAmount",
				"type": "uint256"
			}
		],
		"name": "mintToken",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "buyPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "buy",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "target",
				"type": "address"
			},
			{
				"name": "member",
				"type": "bool"
			}
		],
		"name": "assignMember",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "frozenAccount",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_extraData",
				"type": "bytes"
			}
		],
		"name": "approveAndCall",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "sell",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "target",
				"type": "address"
			},
			{
				"name": "freeze",
				"type": "bool"
			}
		],
		"name": "freezeAccount",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "aurexiaMember",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "target",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "frozen",
				"type": "bool"
			}
		],
		"name": "FrozenFunds",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "target",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "member",
				"type": "bool"
			}
		],
		"name": "IsMember",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Burn",
		"type": "event"
	}
]);

var Token = TokenABI.at('0x8b0B3674d989980407CD52d2E5F7E3F3F12d372C');

var curAccount = web3.eth.accounts[0]

var eventSent = Token.Transfer()
var transactionSentList = []
eventSent.watch(function(error, result) {
 			if (!error) {
 				transactionSentList.push(result);
 				if (curAccount.toLowerCase() === transactionSentList[transactionSentList.length-1].args.from.toLowerCase()) {
	 				sending=false;
	 				var elmt = document.getElementById("loading");
	 				elmt.innerHTML ="<br>Sent!"
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
				var posList = document.createElement("ul")
				posList.id = "sending"
				var notif = document.createElement("li")
				notif.innerHTML = "You sent <strong>" + (transactionSent.args.value.c[0]*0.0001).toString() + " AST </strong> to <strong>" + name + "</strong>"
				posList.appendChild(notif)
				history.appendChild(posList)
			}
			if (curAccount.toLowerCase() === transactionSent.args.to.toLowerCase()) { 
				for (var key in users) {
					if (users[key].adress.toLowerCase() === transactionSent.args.from.toLowerCase()) {
						name = users[key].name
					}
				}
				if (transactionSent.args.from.toLowerCase() === ("0x8b0B3674d989980407CD52d2E5F7E3F3F12d372C").toLowerCase()) {
					name = "Aurexia Central Bank"
				}
				var negList = document.createElement("ul")
				negList.id = "receiving"
				var notif = document.createElement("li")
				notif.innerHTML = "You received <strong>" + (transactionSent.args.value.c[0]*0.0001).toString() + " AST </strong> from <strong>" + name + "</strong>"
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
function makeGraph() {
	var elmt = document.getElementById("rankPage")
	if (elmt!==undefined) {
	    x = ["Dominique","Eric","David","Charles"]
		y = [users.dominique.balance,users.eric.balance,users.david.balance,users.charles.balance]
		data = [
		  {
		    y: y,
		    x: x,
		    type: "bar",
		  }
		]
		Plotly.newPlot('rankPage', data, {displayModeBar: false})
	}
	var leader = document.getElementById("leader")
	leader.innerHTML = "Current Leader : <img src='" + users[(x[y.indexOf(Math.max.apply(null,y))]).toLowerCase()].pic + "'/>"
}

function getBalance(account) {
	window.b
	Token.balanceOf(account, function(err,result) {
		if (!err) {b=result.c[0]*0.0001; console.log("")}
	})
}


//Illustration ici du problème de javascript : ne support qu'un seul thread en meme temps. 
//Pour "attendre" dans une boucle, il faut imbriquer les fonctions. 
//Il faut souvent attendre car la console va plus vite que l'exécution d'une fonction sur ethereum



function attributeBalances() {
	var i = 0
	window.b
	function balances() {
		keys = Object.keys(users)
		var user = users[keys[i]]
		getBalance(user.adress)
		setTimeout( function () {
		user['balance']=b
		i++
		if (i < keys.length) {balances()}},200)
	}
	balances()
}
attributeBalances()
window.setTimeout(function() {makeGraph()},1000)


function sendToken(adress,amount) {
	Token.transfer(adress,parseInt(web3.toWei(amount.toString(),"ether")),function(err,result) {console.log("")})
}

function Transfer() {
	sending=true
	sendToken(document.getElementById("dest-select").value,document.getElementById("amount").value)
	var frm = document.getElementById("send");
	frm.reset();
	return false
}

function newMember(adress) {
	Token.assignMember(adress,true,function(err,result) {console.log("")})
}

function Member() {
	newMember(document.getElementById("adress").value)
	var frm = document.getElementById("member");
	frm.reset();
	return false
}

function loading() {
	var elmt = document.getElementById("loading")
	if (sending) {
		elmt.innerHTML = "<br><div>Sending tokens </div><img src='images/Spinner-1s-40px.gif'/>"
	}
}





function createPage() {
	loading()
	attributeBalances()
	window.setTimeout(function() {makeGraph()},1000)
	var curAccount = web3.eth.accounts[0]
	for (var key in users){
		if (users.hasOwnProperty(key) && users[key].adress.toLowerCase()===curAccount.toLowerCase()) {
			var identity = document.getElementById("identity");
			identity.innerHTML= "<br> <img class = 'pic' src='" + users[key].pic + "' alt='profile pic'> <div id = 'name'> " + users[key].name + " </div>"
				if (users.hasOwnProperty(key) && key==="admin") {
			document.getElementById("adminPage").style.display = "block"
			}
		}
	}
	window.setTimeout(function() {createHistory()},4500)
}




window.setTimeout(function() {window.setInterval(function() {
	createPage()
}, 5000);
},1000)