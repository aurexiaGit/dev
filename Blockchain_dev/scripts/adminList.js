
////////////////////////////////////////////////////////
//     Creation de la table listant les users         //
////////////////////////////////////////////////////////

const getUserTable = (_users, _taille) => {
	var table = document.getElementById("content");
	var i = 1;

	for (var k=0; k<_taille; k++){

		var row = table.insertRow(-1);
		row.className = "row" + i.toString() + " body";

		var column1 = document.createElement('td');
		column1.className = "column1";
		column1.innerHTML = i;
		row.appendChild(column1);

		var column2 = document.createElement('td');
		column2.className = "column2";
		column2.innerHTML = _users[k].name;
		row.appendChild(column2);

		var column3 = document.createElement('td');
		column3.className = "column3";
		column3.innerHTML = _users[k].address;
		row.appendChild(column3);

		var column4 = document.createElement('td');
		column4.className = "column4";
		column4.innerHTML = Math.round(_users[k].balance);
		row.appendChild(column4);

		i++;
	}
}

const getUsersList = async () =>{

	let users = {};
	let listAddressNameBalance;
	let name;
	let i = 0;
  
	const getMembersNameBalance = async () =>{                        
		return new Promise(function(resolve, reject){
			Token.getMembersAndNameAndBalance((err, members) => {
				if (err) return reject(err);
				resolve(members);
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
	let taille = await getTaille();
	console.log("get list of addresses")
	console.log(listAddressNameBalance);
	while (i < taille) {
		var address = listAddressNameBalance[0][i];
		name = web3.toAscii(listAddressNameBalance[1][i]);
		balance = (listAddressNameBalance[2][i])*Math.pow(10,-18);
		users[i]={};
		users[i].address=address;
		users[i].name=name;
		users[i].balance=balance;
		i++;
	}

	console.log(users);

	for (var k = taille-1; k > 0 ; k--){
		for (var j = 0; j < k; j++){
			if (users[j].balance < users[j+1].balance){
				users["tempo"] = users[j];
				users[j] = users[j+1];
				users[j+1] = users["tempo"];
			}
		}
	}
	console.log(users);

	return getUserTable(users, taille)
};

getUsersList();
