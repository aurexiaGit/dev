function createPage(Balance) {	
	if (document.getElementById("astValue") !== undefined) {
		document.getElementById("astValue").innerHTML = Balance.toString() + " AST"	
	}
}

const accountManagement = async () => {

	const getCurAddress = () =>{                         
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
				resolve(result*Math.pow(10,-18));
			})
		})
	};

	let curAddress = await getCurAddress();
	console.log ("current address index");
	console.log (curAddress);
	let balance = await getBalance(curAddress);
	console.log ("balance index");
	console.log (balance);

	return createPage(balance)
}

accountManagement ();

const loading = (_sending) => {
	var elmt = document.getElementById("loading")
	if (_sending == true) {
		elmt.innerHTML = "<br><div>Sending tokens </div><img src='images/Spinner-1s-40px.gif'/>"
	}
}

const Transfer = async() => {

	console.log("in Transfer function")
	let address = document.getElementById("dest-select").value
	let amount = document.getElementById("amount").value
	
	sending = true
	console.log(amount)
	console.log(amount*Math.pow(10,18))
	const transferEvent = (address, amount) =>{
		return new Promise(function(resolve, reject){
			Token.transfer(address, amount*Math.pow(10,18), (err, result) => {
				if (err) return reject (err);
				console.log("transfer execution");
				resolve(result);
				console.log(result)
			})
		})
	};
	
	var frm = document.getElementById("send");
	frm.reset();
	transferTransaction = await transferEvent(address,amount);
	console.log ("transferTransaction")
	console.log (transferTransaction)
	return transferTransaction
}
  