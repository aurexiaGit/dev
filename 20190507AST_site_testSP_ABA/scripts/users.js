/*
var users = {
			admin:{
				adress: "0xc4d446c6B924c431f89214319D5A3e6bb67e7627",
				name: "Administrator",
				pic:"images/admin.png"
			}
		}
*/

var users = {}

var charity = {
			"cravate": {
				"adress": "0x48BC8f1c04940da24349a7c9cdeC2040A860C3fe",			// adresse de l'ancien contrat
				"name": "La Cravate Solidaire"
			}
}

const getUsersInfo = async () =>{

	let listAddress;
	let name;
  
	const getMembers = () =>{                        
	  return new Promise(function(resolve, reject){
		Token.getMembers((err, members) => {
		  if (err) return reject(err);
		  resolve(members);
	  })
	})}

	const getName = () =>{                        
		return new Promise(function(resolve, reject){
		  Token.getName((err, name) => {
			if (err) return reject(err);
			resolve(name);
		})
	})}	
  
	listAddress = await getMembers();
	console.log("get list of addresses")
	console.log(listAddress);
	name = await getName();
	console.log("get names")
	console.log(name);

	return getUsers(listAddress, name);
};

const getUsers = (_listAddress, _name) => {
	var i = 0
	while (i < listAddress.length) {
		var address = listAddress[i];
		users[name]={}
		users[name].address=address
		users[name].name=name
		i++
		console.log(users[name].address)
		console.log(users[name].name)
	}
};

getUsersInfo();
