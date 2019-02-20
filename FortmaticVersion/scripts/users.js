var users = {
		}

var listAddress

function getUsers() {
	var i = 0
	var name
	Token.getMembers(function(err,result) {listAddress = result})
	function getUser() {
		var address = listAddress[i]
		Token.getName(address,function(err,result) {name = result})
		setTimeout( function () {
			console.log(name)
			users[name]={}
			users[name].address=address
			users[name].name=name
			i++
			if (i < listAddress.length) {getUser()}
		},1000)
	}
	window.setTimeout(function() {console.log(listAddress);getUser()},1000)
}

getUsers()