// ******************************************* 
//Test update amount value after sending tokens

const refreshBalance= async () => {

	const getCurAddress = () =>{                         
		return new Promise(function(resolve, reject){
		web3.eth.getAccounts((err, accounts) => {
			if (err) return reject(err);
			console.log(accounts[0])
			resolve(accounts[0]);
		})
  	})};
	
  	const getBalance = (_curAddress) =>{
		return new Promise(function(resolve, reject){
			Token.balanceOf(_curAddress, (err, result) => {
				if (err) return reject (err);
				console.log(result*Math.pow(10,-18))
				resolve(result*Math.pow(10,-18));
			})
		})
	};
	
	let curAddress = await getCurAddress();
	console.log(curAddress)
	let balance = await getBalance(curAddress);
	console.log(balance)

	const filter = web3.eth.filter('latest');

	let bal;

	filter.watch((err, res) => {
	if (err) {
		console.log(`Watch error: ${err}`);
	} else {
	// Update balance
		const refresh= async (curAddress,balance) => {
			let bal;
			bal = await getBalance(curAddress);
			if (balance < bal) {
				alert("Your transaction has been executed!")
				balance = bal*Math.pow(10,-18);
				console.log(balance);
				console.log("watched")
				document.getElementById("astValue").innerHTML = balance.toString() + " AST"
			} else if (balance > bal) {
				alert("You have received " + (balance - bal)*Math.pow(10,-18).toString() + " AST!")
				balance = bal*Math.pow(10,-18);
				console.log(balance);
				console.log("watched")
				document.getElementById("astValue").innerHTML = balance.toString() + " AST"
			}
		}
		refresh(curAddress,balance)
	}
	});
}

refreshBalance();
/*
const getAccountAddress= async () => {

	let curAddress;

	const getCurAddress = () =>{                         
		return new Promise(function(resolve, reject){
		web3.eth.getAccounts((err, accounts) => {
			if (err) return reject(err);
			console.log(accounts[0])
			resolve(accounts[0]);
		})
  	})};
	curAddress = await getCurAddress();
	console.log(curAddress)
	return curAddress;
}

const getAccountBalance= async (_curAddress) => {

	let balance;

  	const getBalance = (_curAddress) =>{
		return new Promise(function(resolve, reject){
			Token.balanceOf(_curAddress, (err, result) => {
				if (err) return reject (err);
				console.log(result*Math.pow(10,-18))
				resolve(result*Math.pow(10,-18));
			})
		})
	};
	balance = await getBalance(_curAddress);
	console.log(balance)
	return balance;
}

var curAddress = getAccountAddress();
console.log(curAddress)
//var balance = getAccountBalance(curAddress);
balance = 17449999999999996995997
console.log(balance)

const filter = web3.eth.filter('latest');
filter.watch((err, res) => {
	if (err) {
		console.log(`Watch error: ${err}`);
	} else {
	// Update balance
    Token.balanceOf("0xc4d446c6B924c431f89214319D5A3e6bb67e7627", (err, bal) => {
      if (err) {
        console.log(`getBalance error: ${err}`);
      } else {
		if (balance < bal) {
			alert("Your transaction has been executed!")
			balance = bal*Math.pow(10,-18);
			console.log(balance);
			console.log("watched")
			document.getElementById("astValue").innerHTML = balance.toString() + " AST"
		} else if (balance > bal) {
			alert("You have received " + (balance - bal)*Math.pow(10,-18).toString() + " AST!")
			balance = bal*Math.pow(10,-18);
			console.log(balance);
			console.log("watched")
			document.getElementById("astValue").innerHTML = balance.toString() + " AST"
		}
      }
	});
}
});
*/
// *******************************************

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
  