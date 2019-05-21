
// DOESNT WORK YET 

// Charities don't have an account on this contract. If need be they should be created


function makeGraph() {
	// creates a graph with the balances of both charities
	var elmt = document.getElementById("rankPage")
	if (elmt!==undefined) {
	    x = ["La Cravate Solidaire","Les Bouchons d'Amour"]
		y = [charity.cravate.balance,charity.bouchon.balance]
		data = [
		  {
		    y: y,
		    x: x,
		    type: "bar",
		  }
		]
		Plotly.newPlot('rankPage', data, {displayModeBar: false})
	}
}


var Balance

function getBalance(account) {
	Balance=0
	Token.balanceOf(account, function(err,result) {
		if (!err) {Balance=parseInt(result*Math.pow(10,-18)); console.log("")}
	})
}


function attributeBalances() {
	// gets the balances of each charity. Again here an embedded function is needed
	var i = 0
	Balance=0
	function balances() {
		keys = Object.keys(charity)
		var user = charity[keys[i]]
		getBalance(user.adress)
		setTimeout( function () {
			user['balance']=Balance
			i++
			if (i < keys.length) {balances()}
		},1000)
	}
	balances()
}

var curAccount = web3.eth.accounts[0]

function createGraph() {
	// Calculates the balances first and then creates the graphic 
	attributeBalances()
	window.setTimeout(function() {makeGraph()},3000)
}

createGraph()

/*
window.setInterval(function() {
	createGraph()
}, 4000)
*/