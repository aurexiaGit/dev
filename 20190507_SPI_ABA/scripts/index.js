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
			resolve(accounts[0]);
		})
  	})};

  	const getBalance = (_curAddress) =>{
		return new Promise(function(resolve, reject){
			Token.balanceOf(_curAddress, (err, result) => {
				if (err) return reject (err);
				resolve(result*Math.pow(10,-18));
			})
		})
	};

	let curAddress = await getCurAddress();
	let balance = await getBalance(curAddress);

	return createPage(balance)
}

accountManagement ();

const loading = (_sending) => {
	var elmt = document.getElementById("loading")
	if (_sending == true) {
		elmt.innerHTML = "<br><div>Sending tokens </div><img src='images/Spinner-1s-40px.gif'/>"
	}
}

//Transfer tokens when clicking on "send" in home page
const Transfer = async() => {

	let address = document.getElementById("dest-select").value
	let amount = document.getElementById("amount").value
	
	sending = true

	const transferEvent = (address, amount) =>{
		return new Promise(function(resolve, reject){
			Token.transfer(address, amount*Math.pow(10,18), (err, result) => {
				if (err) return reject (err);
				resolve(result);
			})
		})
	};

	var frm = document.getElementById("send");
	frm.reset();
	transferTransaction = await transferEvent(address,amount);
	return transferTransaction
}
  