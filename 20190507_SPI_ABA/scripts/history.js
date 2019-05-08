$.getJSON('https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=0xc4d446c6B924c431f89214319D5A3e6bb67e7627&startblock=0&endblock=999999999&sort=asc&apikey=NSAMUW521D6CQ63KHUPRQEERSW8FVRAF9B', function(data) {
	console.log(data)
	var resultArray = data.result

	var table = document.getElementById("content-history")
	var i = 1

	for (var key in resultArray){

		var row = document.createElement('tr')
		row.class = "row" + i.toString() + " body"
		table.appendChild(row)

		var column1 = document.createElement('td')
		column1.className = "column1"
		column1.innerHTML = resultArray[key].timeStamp
		row.appendChild(column1)
		console.log(resultArray[key].timeStamp)

		var column2 = document.createElement('td')
		column2.className = "column2"
		if (resultArray[key].from == "0xc4d446c6B924c431f89214319D5A3e6bb67e7627") {
			column2.innerHTML = "Reception"
		}
		else {
			column2.innerHTML = "Transfer"
		}
		row.appendChild(column2)
		console.log(column2.innerHTML)

		var column3 = document.createElement('td')
		column3.className = "column3"
		column3.innerHTML = resultArray[key].from
		row.appendChild(column3)
		console.log(resultArray[key].from)

		var column4 = document.createElement('td')
		column4.className = "column4"
		column4.innerHTML = resultArray[key].to
		row.appendChild(column4)
		console.log(resultArray[key].to)
		
		var column5 = document.createElement('td')
		column5.className = "column5"
		if (resultArray[key].from == "0xc4d446c6B924c431f89214319D5A3e6bb67e7627") {
			column5.innerHTML = "+" + resultArray[key].amount*Math.pow(10,-18)
		}
		else {
			column5.innerHTML = "+" + resultArray[key].amount*Math.pow(10,-18)
		}
		row.appendChild(column5)
		console.log(column5.innerHTML)

		i++

	}
});

