
function makeGraph() {
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
		if (!err) {Balance=result.c[0]*0.0001; console.log("")}
	})
}


//Illustration ici du problème de javascript : ne support qu'un seul thread en meme temps. 
//Pour "attendre" dans une boucle, il faut imbriquer les fonctions. 
//Il faut souvent attendre car la console va plus vite que l'exécution d'une fonction sur ethereum

function attributeBalances() {
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

function createPage() {
	attributeBalances()
	window.setTimeout(function() {makeGraph()},3000)
}

window.setInterval(function() {
	createPage()
}, 4000)