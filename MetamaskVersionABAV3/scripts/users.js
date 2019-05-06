var users = {}

var charity = {
			"cravate": {
				"address": "0x48BC8f1c04940da24349a7c9cdeC2040A860C3fe",			
				"name": "La Cravate Solidaire"
			}
}

/*
function getUsers() {
	// The function gets the array of addresses from the Blockchain and then fills the dictionnary users
	var i = 0
	var name
	Token.getMembers(function(err,result) {listAddress = result})
	// To get the information the js file must comunicate with the Blockchain. This takes time.
	// Thus, we need to create this embedded function to wait between each calls.
	function getUser() {
		var address = listAddress[i]
		Token.getName(address,function(err,result) {name = result})
		window.setTimeout(function () {
			users[name]={}
			users[name].address=address
			users[name].name=name
			i++
			if (i < listAddress.length) {getUser()}
		},1500)
	}
	window.setTimeout(function() {getUser()},1500)
}

function createUsers() {
	// Sometimes getUsers doesn't work the first time. This function repeates the call until it has succeeded.
	getUsers()
	window.setTimeout(function() {if (users["Administrator"]===undefined) {createUsers()}},6000)
}

createUsers()
*/

/*
async function getUsersbis(){
	var i = 0
	var name
	const listAddress = await Token.getMembers
	var lengthListAddress = listAddress.length
}
	while (i<listAddress.length){	
		var address = listAddress[i]
		name = await Token.getName(address)
		users[name]={}
		users[name].address=address
		users[name].name=name
		i++
	}
}
*/

/*
async function getUsers(){
	const listAddress = await Token.getMembers
	//Token.getMembers((err) => { lengthListAddress = Token.getMembers.length })
	//console.log(lengthListAddress)
	var i = 0

}
*/
async function getLogUsers() {

	await Token.getMembers((err, arrayAddress) => {
		if (err) throw err;
		console.log("test members");
		listAddress = arrayAddress;
		console.log(listAddress);
		while (i<listAddress.length){	
			var address = listAddress[i]
			name = Token.getName(address)
			users[name]={}
			users[name].address=address
			users[name].name=name
			i++
		}
	});
}

getLogUsers();
//web3.eth.getAccounts((err, accounts) => { curAccount = accounts[0] })