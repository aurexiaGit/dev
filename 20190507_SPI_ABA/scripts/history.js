const getHistory = async () =>{

	let curAddress;
	let ownerAddress;
  
	const getCurAddress = () =>{                         
	  return new Promise(function(resolve, reject){
		web3.eth.getAccounts((err, accounts) => {
		  if (err) return reject(err);
		  resolve(accounts[0]);
	  })
	})}
  
	curAddress = await getCurAddress();
	
	let users = {};
	let listAddress;
	let name;
	var i = 0;

	const getMembers = () =>{                        
		return new Promise(function(resolve, reject){
			Token.getMembers((err, members) => {
				if (err) return reject(err);
				resolve(members);
		})
	})}

	const getName = (address) =>{                        
		return new Promise(function(resolve, reject){
			Token.getName(address, (err, name) => {
				if (err) return reject(err);
				resolve(name);
		})
	})}	

	listAddress = await getMembers();
	console.log("get list of addresses")
	console.log(listAddress);
	while (i < listAddress.length) {
		var address = listAddress[i];
		console.log(address)
		name = await getName(address);
		users[name]={}
		users[name].address=address
		users[name].name=name
		i++
		console.log(users[name].address)
		console.log(users[name].name)
	}

	$.getJSON('https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=' + curAddress + '&startblock=0&endblock=999999999&sort=asc&apikey=NSAMUW521D6CQ63KHUPRQEERSW8FVRAF9B', function(data) {
		console.log(data)
		console.log(users)
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
			column3.innerHTML = users[resultArray[key].from].name
			row.appendChild(column3)
			console.log(users[resultArray[key].from].name)

			var column4 = document.createElement('td')
			column4.className = "column4"
			column4.innerHTML = users[resultArray[key].to].name
			row.appendChild(column4)
			console.log(users[resultArray[key].to].name)
			
			var column5 = document.createElement('td')
			column5.className = "column5"
			if (resultArray[key].from == "0xc4d446c6B924c431f89214319D5A3e6bb67e7627") {
				column5.innerHTML = "+" + resultArray[key].amount
			}
			else {
				column5.innerHTML = "+" + resultArray[key].amount
			}
			row.appendChild(column5)
			console.log(column5.innerHTML)

			i++

		}
	});

};

getHistory();