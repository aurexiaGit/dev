const getRankingTable = (_usersTop, _usersPerso) => {
	var table = document.getElementById("content")
	var i = 1

	for (var key in _usersTop){

		var row = document.createElement('tr')
		row.class = "row" + i.toString() + " body"
		table.appendChild(row)

		var column1 = document.createElement('td')
		column1.className = "column1"
		column1.innerHTML = _usersTop[key].classement
		row.appendChild(column1)

		var column2 = document.createElement('td')
		column2.className = "column2"
		column2.innerHTML = _usersTop[key].name
		row.appendChild(column2)

		var column3 = document.createElement('td')
		column3.className = "column3"
		column3.innerHTML = _usersTop[key].address
		row.appendChild(column3)

		var column4 = document.createElement('td')
		column4.className = "column4"
		column4.innerHTML = _usersTop[key].balance
		row.appendChild(column4)

		i++
	}

	var table_perso = document.getElementById("content_perso")
	var j = 1

	for (var key in _usersPerso){

		var row = document.createElement('tr')
		row.class = "row" + j.toString() + " body"
		table_perso.appendChild(row)

		var column1 = document.createElement('td')
		column1.className = "column1"
		column1.innerHTML = _usersPerso[key].classement
		row.appendChild(column1)

		var column2 = document.createElement('td')
		column2.className = "column2"
		column2.innerHTML = _usersPerso[key].name
		row.appendChild(column2)

		var column3 = document.createElement('td')
		column3.className = "column3"
		column3.innerHTML = _usersPerso[key].address
		row.appendChild(column3)

		var column4 = document.createElement('td')
		column4.className = "column4"
		column4.innerHTML = _usersPerso[key].balance
		row.appendChild(column4)

		i++
	}
}


const getRankingList = async () =>{

	console.log("ranking")
	let users = {};
	let listAddress;
	let name;
	let i = 0;
	
	const getCurAddress = () =>{                         // fonctionne mais on a besoin de reloader la page pour que ca s'initialise (le await ne marche pas pour la fonction getAccounts de web3)
		return new Promise(function(resolve, reject){
		web3.eth.getAccounts((err, accounts) => {
			if (err) return reject(err);
			resolve(accounts[0]);
    	})
	  })
	}

	const getMembers = () =>{                        
		return new Promise(function(resolve, reject){
			Token.getMembers((err, members) => {
				if (err) return reject(err);
				resolve(members);
	  		})
		})
	};

	const getName = (address) =>{                        
		return new Promise(function(resolve, reject){
			Token.getName(address, (err, name) => {
				if (err) return reject(err);
				resolve(name);
			})
		})
	};
	
	const getBalance = (_curAddress) =>{
		return new Promise(function(resolve, reject){
			Token.balanceOf(_curAddress, (err, result) => {
				if (err) return reject (err);
				resolve(result*Math.pow(10,-18));
			})
		})
	};
	
	listAddress = await getMembers();
	curAddress = await getCurAddress
	console.log('cur address')
	console.log(curAddress)
	console.log("list address")
	console.log(listAddress)

	while (i < listAddress.length) {
		var address = listAddress[i];
		name = await getName(address);
		balance = await getBalance(address);
		users[i]={};
		users[i].address=address;
		users[i].name=name;
		users[i].balance=balance;
		i++
	}

	let usersTop = {};
	let usersPerso = {};
	for (let i = listAddress.length-1; i > 0 ; i--){
		for (let j = 0; j < i; j++){
			if (users[j].balance > users[j+1].balance){
				users["tempo"] = users[j];
				users[j] = users[j+1];
				users[j+1] = users["tempo"];
			}
		}
	}

	if (listAddress <= 3){
		usersTop = users;
		for (let i=0; i<listAddress.length; i++){
			usersTop[i].classement = i+1;
		}
	}
	else{
		for (let i=0; i<3; i++){
			usersTop[i]=users[i];
			usersTop[i].classement = i+1;
		}
	}
	for (let i=0; i<listAddress.length; i++){
		if (users[i].address == curAddress){
			usersPerso[0] = users[i];
			usersPerso[0].classement = i+1;
			break;
		}
		else{
			usersPerso[0].name = err;
			usersPerso[0].address = err;
			usersPerso[0].balance = err;
			usersPerso[0].classement = err;
		}
	}


	return getRankingTable(usersTop, usersPerso);
};

getRankingList();