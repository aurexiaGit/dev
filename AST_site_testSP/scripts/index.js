function createPage(Balance) {	
	if (document.getElementById("astValue") !== undefined) {
		document.getElementById("astValue").innerHTML = Balance.toString() + " AST"	
	}
}

const accountManagement = async () => {

	const getCurAddress = () =>{                         //ne fonctionne pas, on a besoin de reloader la page pour que ca s'initialise (le await ne marche pas pour la fonction getAccounts de web3)
		return new Promise(function(resolve, reject){
		web3.eth.getAccounts((err, accounts) => {
			if (err) return reject(err);
			console.log ("entre get account");
			resolve(accounts[0]);
		})
  })};

  	const getBalance = (_curAddress) =>{
		return new Promise(function(resolve, reject){
			Token.balanceOf(_curAddress, (err, result) => {
				if (err) return reject (err);
				console.log("balance of");
				resolve(result.Math.pow(10,-18));
			})
		})
	  }

	let curAddress = await getCurAddress();
	console.log ("current address index");
	console.log (curAddress);
	let balance = await getBalance(curAddress);
	console.log ("balance index");
	console.log (balance);

	return createPage(balance)
}

accountManagement ();