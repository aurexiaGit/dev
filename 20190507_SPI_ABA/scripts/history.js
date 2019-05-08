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

	function convert(timestamp) {
		var date = new Date(                          // Convert to date
		  parseInt(timestamp)                         // Convert to integer
		);
		return [
		  ("0" + date.getDate()).slice(-2),           // Get day and pad it with zeroes
		  ("0" + (date.getMonth()+1)).slice(-2),      // Get month and pad it with zeroes
		  date.getFullYear()                          // Get full year
		].join('/');                                  // Glue the pieces together
	  }

	$.getJSON('https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=' + curAddress + '&startblock=0&endblock=999999999&sort=asc&apikey=NSAMUW521D6CQ63KHUPRQEERSW8FVRAF9B', function(data) {
		console.log(data)
		console.log(users)
		var resultArray = data.result

		const fillHistory = async (resultArray, curAddress) =>{
			
			var table = document.getElementById("content-history")
			var i = 1
			for (var key in resultArray){

				var row = document.createElement('tr')
				row.class = "row" + i.toString() + " body"
				table.appendChild(row)

				var column1 = document.createElement('td')
				column1.className = "column1"
				column1.innerHTML = convert(resultArray[key].timeStamp)
				row.appendChild(column1)
				console.log(convert(resultArray[key].timeStamp))

				var column2 = document.createElement('td')
				column2.className = "column2"
				if (resultArray[key].from == curAddress) {
					column2.innerHTML = "Transfer"
				}
				else {
					column2.innerHTML = "Reception"
				}
				row.appendChild(column2)
				console.log(column2.innerHTML)

				var column3 = document.createElement('td')
				column3.className = "column3"
				column3.innerHTML = await getName(resultArray[key].from)
				console.log(column3.innerHTML)
				row.appendChild(column3)

				var column4 = document.createElement('td')
				column4.className = "column4"
				column4.innerHTML = await getName(resultArray[key].to)
				row.appendChild(column4)
				console.log(column4.innerHTML)
				
				var column5 = document.createElement('td')
				column5.className = "column5"
				if (resultArray[key].from == "0xc4d446c6B924c431f89214319D5A3e6bb67e7627") {
					column5.innerHTML = "+" + resultArray[key].value
				}
				else {
					column5.innerHTML = "-" + resultArray[key].value
				}
				row.appendChild(column5)
				console.log(column5.innerHTML)

				i++

			}
		}
		fillHistory(resultArray, curAddress);
	});

};

getHistory();