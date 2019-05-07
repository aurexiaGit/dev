var users = {}

var charity = {
			"cravate": {
				"adress": "0x48BC8f1c04940da24349a7c9cdeC2040A860C3fe",			// adresse de l'ancien contrat
				"name": "La Cravate Solidaire"
			}
}

const getUsers = async () =>{

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

	return users;
};

getUsers();
