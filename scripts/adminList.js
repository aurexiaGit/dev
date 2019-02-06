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
	column4.innerHTML = "1000"
	row.appendChild(column4)

    i++
}

