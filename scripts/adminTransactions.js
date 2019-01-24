// Prevent admin from quitting page and loose global history

window.onbeforeunload = function(){
  return 'ATTENTION - Are you sure you want to quit? You will reset the History.';
};

var sending = false 

function createHistory() {
	var curAccount = web3.eth.accounts[0]
	if (transactionSentList !== undefined) {
		var reciever
		var sender
		var history = document.getElementById("history")
		history.innerHTML = ""
		transactionSentList.forEach(function(transactionSent) {
			if (transactionSent.args.from.toLowerCase() !== ("0x0000000000000000000000000000000000000000").toLowerCase()) {
				for (var key in users) {
					if (users[key].adress.toLowerCase() === transactionSent.args.to.toLowerCase()) {
						reciever = users[key].name
					}
					if (users[key].adress.toLowerCase() === transactionSent.args.from.toLowerCase()) {
						sender = users[key].name
					}
					if (transactionSent.args.from.toLowerCase() === ("0x8b0B3674d989980407CD52d2E5F7E3F3F12d372C").toLowerCase()) {
						sender = "Aurexia Central Bank"
					}
				}
				for (var key in charity) {
					if (charity[key].adress.toLowerCase() === transactionSent.args.to.toLowerCase()) {
						reciever = charity[key].name
					}
				}
				var posList = document.createElement("ul")
				posList.id = "sending"
				var notif = document.createElement("li")
				notif.innerHTML = "<strong>" + sender + "</strong> sent <strong>" + (transactionSent.args.value.c[0]*0.0001).toString() + " AST </strong> to <strong>" + reciever + "</strong>"
				posList.appendChild(notif)
				history.appendChild(posList)
				document.getElementById("sending").style.listStyleImage = "url('../images/transaction.png')"
			}
		})
	}	
}

function getListMax(list) {
	// returns list of index(es) of maximum (maxima if equal)
	var indexMax = []
	while (list.indexOf(Math.max.apply(null,list),indexMax[indexMax.length-1]+1) !== -1) {
		indexMax.push(list.indexOf(Math.max.apply(null,list),indexMax[indexMax.length-1]+1))
	}
	return indexMax	
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
	var leaders = getListMax(y)
	leader.innerHTML = "Current Leader : "
	if (leaders.length > 1) {leader.innerHTML = "Current Leaders : "}
	leaders.forEach(function(ind) {
		leader.innerHTML = leader.innerHTML + "<img src='" + users[(x[ind]).toLowerCase()].pic + "'/>"
	})
}


var Balance

function getBalance(account) {
	Balance=0
	Token.balanceOf(account, function(err,result) {
		if (!err) {Balance=result.c[0]*0.0001; console.log("")}
	})
}


// Illustration ici du problème de javascript : ne support qu'un seul thread en meme temps. 
// Pour "attendre" dans une boucle, il faut imbriquer les fonctions. 
// Il faut souvent attendre car la console va plus vite que l'exécution d'une fonction sur ethereum

function attributeBalances() {
	var i = 1
	Balance=0
	function balances() {
		keys = Object.keys(users)
		var user = users[keys[i]]
		getBalance(user.adress)
		setTimeout( function () {
			user['balance']=Balance
			i++
			if (i < keys.length) {balances()}
		},600)
	}
	balances()
}


function createPage() {
	attributeBalances()
	window.setTimeout(function() {makeGraph()},3000)
	window.setTimeout(function() {createHistory()},4500)
}


window.setTimeout(function() {window.setInterval(function() {
	createPage()
}, 5000);
},1000)