var table = document.getElementById("content")
var i = 1

for (var key in users){

	var row = document.createElement('tr')
	row.class = "row" + i.toString() + " body"
	table.appendChild(row)

	var column1 = document.createElement('td')
	column1.className = "column1"
	column1.innerHTML = "<img src = '" + users[key].pic + "'>"
	row.appendChild(column1)

	var column2 = document.createElement('td')
	column2.className = "column2"
	column2.innerHTML = users[key].name
	row.appendChild(column2)

	var column3 = document.createElement('td')
	column3.className = "column3"
	column3.innerHTML = users[key].adress
	row.appendChild(column3)

	var column4 = document.createElement('td')
	column4.className = "column4"
	column4.innerHTML = ""
	row.appendChild(column4)

    i++
}


var Balance

function getBalance(account) {
	Balance=0
	Token.balanceOf(account, function(err,result) {
		if (!err) {Balance=parseInt(result*Math.pow(10,-18)); console.log("")}
	})
}


// Illustration ici du problème de javascript : ne support qu'un seul thread en meme temps. 
// Pour "attendre" dans une boucle, il faut imbriquer les fonctions. 
// Il faut souvent attendre car la console va plus vite que l'exécution d'une fonction sur ethereum

function attributeBalances() {
	var i = 0
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
	var i = 1
	for (var key in users) {
		var value = document.getElementsByClassName('column4')[i]
		value.innerHTML = users[key].balance
		i++
	}
}


window.setTimeout(function() {window.setInterval(function() {
	createPage()
}, 5000);
},1000)

