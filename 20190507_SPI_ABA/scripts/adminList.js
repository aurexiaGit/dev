//////////////////////////////////////////////////
//      Verification du status Admin ou non     //
//////////////////////////////////////////////////

const getLog = async () =>{

	let curAddress;
	let ownerAddress;
  
	const getCurAddress = () =>{                         // fonctionne mais on a besoin de reloader la page pour que ca s'initialise (le await ne marche pas pour la fonction getAccounts de web3)
	  return new Promise(function(resolve, reject){
		web3.eth.getAccounts((err, accounts) => {
		  if (err) return reject(err);
		  resolve(accounts[0]);
	  })
	})}
  
	const getOwner = () =>{
	  return new Promise(function(resolve, reject){
		Token.owner((err, accounts) => {
		  if (err) return reject(err);
		  resolve(accounts);
	  })
	})}
  
	curAddress = await getCurAddress();
	console.log("get account main")
	console.log(curAddress);
	ownerAddress = await getOwner();
	console.log("getowner main")
	console.log(ownerAddress);
  
	return getBanner(curAddress, ownerAddress);
  };
  
  const getBanner = (_curAddress, _ownerAddress) => {
	if (_curAddress == _ownerAddress && _curAddress !== undefined && _ownerAddress!== undefined) {
	  console.log(true);
	  var identity = document.getElementById("identity");
	  identity.innerHTML= "<br> <img class = 'pic' src= 'images/admin.png' alt='profile pic'> <div id = 'name'> Administrator </div> <br> <img id='notifButton' onclick='showNotif()' src='images/notification.png'> ";
	  document.getElementById("adminPage").style.display = "block";
	  }
	else {
	  console.log("owner address else (main)")
	  console.log(_ownerAddress)
	}
  };
  
  getLog();



////////////////////////////////////////////////////////
//     Creation de la table listant les users         //
////////////////////////////////////////////////////////

const getUserTable = (_users) => {
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
		column3.innerHTML = users[key].address
		row.appendChild(column3)

		var column4 = document.createElement('td')
		column4.className = "column4"
		column4.innerHTML = users[key].balance
		row.appendChild(column4)

		i++
	}
}

const getUsers = async () =>{

	let users = {};
	let listAddress;
	let name;
	let i = 0;
  
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
	console.log("get list of addresses")
	console.log(listAddress);
	while (i < listAddress.length) {
		var address = listAddress[i];
		console.log(address)
		name = await getName(address);
		balance = await getBalance(address);
		users[name]={};
		users[name].address=address;
		users[name].name=name;
		users[name].balance=balance;
		i++
		console.log(users[name].address);
		console.log(users[name].name);
		console.log(users[name].balance);
	}

	return getUserTable(users)
};

getUsers();
