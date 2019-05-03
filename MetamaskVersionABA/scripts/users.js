var users = {}

var charity = {
			"cravate": {
				"adress": "0x48BC8f1c04940da24349a7c9cdeC2040A860C3fe",			
				"name": "La Cravate Solidaire"
			}
}


//test de code seb


async function getAllUsers () {
	/*var listAddress = [];
	listAddress = await Token.getMembers(function(err,result) {return result})
	for (var i=0; i<listAddress.length; i++){
		var address = listAddress[i];
		var name = await Token.getName(address, function(err, result){return result});
		var balance = await Token.balanceOf(address, function(err, result){return result})
		users[name].address = address;
		users[name].name = name;
		users[name].balance = balance;
	}
	*/
	try{
		listAddress = await Token.getMembers(function(err,result) {return result})
	}
	catch(err){
		alert(err.message)
	}
	alert(listAddress.length)
}
getAllUsers()


//fonction de base d'antoine

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

createUsers()*/