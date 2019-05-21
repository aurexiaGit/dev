
//initiates an empty dictionnary to store the addresses
var users = {
		}

var listAddress

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