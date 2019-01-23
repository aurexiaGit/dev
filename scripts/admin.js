
var logged;
var user;
var pass;

function Login(){
	if (username.value in users && users[username.value].password === password.value)  {
		user = 'user1'
		pass = 'user1'
		logged = true;
		window.location="homePage.html";
	}
	return false
}

if (logged) {
	document.getElementById("nom_utilisateur").value = user
}

function logOut() {
	window.location="login.html"
}

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

function followTransactions() {
	window.location="adminTransactions.html"
}

function charities() {
	window.location="adminCharities.html"
}

function manageMembership() {
	window.location="adminMember.html"
}

function createdestroyTokens() {
	window.location="adminToken.html"
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

var Balance

function myBalance() {
	var curAccount = web3.eth.accounts[0]
	Token.balanceOf(curAccount, function(err,result) {
		if (!err) {Balance = result.c[0]*0.0001 ; console.log("")}
	})
}

function getBalance(Account) {
	var Account = Account
	Token.balanceOf(this.Account, function(err,result) {
		if (!err) {Balance = result.c[0]*0.0001 ; console.log("")}
	})
	return Balance
}




function sendToken(adress,amount) {
	Token.transfer(adress,parseInt(web3.toWei(amount.toString(),"ether")),function(err,result) {console.log("")})
}

function Transfer() {
	sendToken(document.getElementById("dest-select").value,document.getElementById("amount").value)
	var frm = document.getElementById("send");
	frm.reset();
	return false
}

function newMember(adress) {
	Token.assignMember(adress,true,function(err,result) {console.log("")})
}

function addMember() {
	newMember(document.getElementById("adress1").value)
	var frm = document.getElementById("addMember");
	frm.reset();
	return false
}

function delMember(adress) {
	Token.assignMember(adress,false,function(err,result) {console.log("")})
}

function remMember() {
	delMember(document.getElementById("adress2").value)
	var frm = document.getElementById("remMember");
	frm.reset();
	return false
}

function mintTokens(adress,amount) {
	Token.mintToken(adress,parseInt(web3.toWei(amount.toString(),"ether")),function(err,result) {console.log("")})
}

function initialDonations() {
	if (window.confirm("Do you really want to send initial donations to all Blockchain members?")) {
		for (key in users) {
			if (key !== "admin") {
				mintTokens(users[key].adress,40)
			}
		}
	}
}

function createPage() {
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
}

function createTokens() {
	var amount = document.getElementById("amount1").value
	var adress = document.getElementById("adress1").value
	mintTokens(adress,parseInt(web3.toWei(amount.toString(),"ether")),function(err,result) {console.log("")})
}

function burnTokens(adress,amount) {
	Token.burnFrom(adress,parseInt(web3.toWei(amount.toString(),"ether")),function(err,result) {console.log("")})
}

function destroyTokens() {
	var amount = document.getElementById("amount2").value
	var adress = document.getElementById("adress2").value
	burnTokens(adress,amount)
}

window.setInterval(function() {createPage()},1000)