
const getRankingTable = (_usersTop) => {
	var table = document.getElementById("content");
	var i = 0;
	console.log("userTop");
	console.log(_usersTop);
	console.log('ranking table');

	for (key in _usersTop){

		var number = i + 2;
		var row = table.insertRow(-1);
		row.className = "row" + number.toString() + " body";

		var column1 = document.createElement('td');
		column1.className = "column1";
		column1.innerHTML = _usersTop[key].classement;
		row.appendChild(column1);

		var column2 = document.createElement('td');
		column2.className = "column2";
		column2.innerHTML = _usersTop[key].name;
		console.log (_usersTop[key].name);
		row.appendChild(column2);

		var column3 = document.createElement('td');
		column3.className = "column3";
		column3.innerHTML = Math.round(_usersTop[key].balance);
		row.appendChild(column3);

		console.log(i);
		i++;
		
	}
}


const getRankingList = async () =>{

	console.log("ranking")
	var users = {};
	var listAddressNameBalance;
	var name;
	var i = 0;
	
	const getCurAddress = async () =>{                     
		return new Promise(function(resolve, reject){
		web3.eth.getAccounts((err, accounts) => {
			if (err) return reject(err);
			resolve(accounts[0]);
    	})
	  })
	}

	const getMembersNameBalance = async () =>{                        
		return new Promise(function(resolve, reject){
			Token.getMembersAndNameAndBalance((err, members) => {
				if (err) return reject(err);
				resolve(members);
	  		})
		})
	};

	const getName = async (address) =>{                        
		return new Promise(function(resolve, reject){
			Token.getName(address, (err, res) => {
				if (err) return reject(err);
				let name = web3.toAscii(res);
				resolve(name);
			})
		})
	};
	
	const getBalance = async (_curAddress) =>{
		return new Promise(function(resolve, reject){
			Token.balanceOf(_curAddress, (err, result) => {
				if (err) return reject (err);
				resolve(result*Math.pow(10,-18));
			})
		})
	};

	const getTaille = async () =>{
		return new Promise(function(resolve, reject){
		  Token.sizeListAccount((err, result) => {
			if (err) return reject(err);
			resolve(result);
		})
	  })}
	
	listAddressNameBalance = await getMembersNameBalance();
	curAddress = await getCurAddress();
	var taille = await getTaille();
	console.log("taille1");
	console.log(taille);

	//listAddress.splice(0,1);       // cette fonction supprime l'administrateur de la liste des personnes (pour ne pas l'afficher). je le garde car on a peu de membre pour le moment mais a terme on activera la fonction
	//taille = taille - 1;
	console.log("taille 1");
	console.log(taille);
	
	console.log('cur address')
	console.log(curAddress)
	console.log("list address")
	console.log(listAddressNameBalance)

	while (i < taille) {
		var address = listAddressNameBalance[0][i];
		name = web3.toAscii(listAddressNameBalance[1][i]);
		balance = (listAddressNameBalance[2][i])*Math.pow(10,-18);
		users[i]={};
		users[i].address=address;
		users[i].name=name;
		users[i].balance=balance;
		i++
	}

	var usersTop = {};
	var usersPerso = {
					Perso:{
						name: "err",
						address: "err",
						balance: "err",
						classement: "err"
					}
				};


	for (var i = taille-1; i > 0 ; i--){
		for (var j = 0; j < i; j++){
			if (users[j].balance < users[j+1].balance){
				users["tempo"] = users[j];
				users[j] = users[j+1];
				users[j+1] = users["tempo"];
			}
		}
	}
	console.log(users);
	
	if (taille <= 3){
		console.log("dans if1")
		for (var i=0; i<taille; i++){
			usersTop[i] = {};
			usersTop[i].name = users[i].name;
			usersTop[i].address = users[i].address;
			usersTop[i].balance = users[i].balance;
			usersTop[i].classement = i + 1;
		}
	}
	else{
		console.log("dans if2")
		for (var i=0; i<3; i++){
			usersTop[i] = {};
			usersTop[i].name = users[i].name;
			usersTop[i].address = users[i].address;
			usersTop[i].balance = users[i].balance;
			usersTop[i].classement = i+1;
		}
	}

	for (var i=0; i<taille; i++){
		if (users[i].address.toLowerCase() == curAddress.toLowerCase()){
			usersPerso["Perso"].name = users[i].name;
			usersPerso["Perso"].address = curAddress;
			usersPerso["Perso"].balance = users[i].balance;
			usersPerso["Perso"].classement = i + 1;
			break;
		}
	}

	// Display current user's ranking
	var ownRankEnd = "th";
	var ownRank = usersPerso["Perso"].classement
	switch(ownRank) {
		case 1:
			ownRankEnd = "st"
			break;
		case 2:
			ownRankEnd = "nd"
			break;
		case 3:
			ownRankEnd = "rd"
			break;
	}

	var rank = document.getElementById("ownRanking");
	rank.innerHTML="<p class='ownRankingTxt'>You are currently ranked " + ownRank.toString() + ownRankEnd  + "</p>";

	return getRankingTable(usersTop, usersPerso);
};

getRankingList();