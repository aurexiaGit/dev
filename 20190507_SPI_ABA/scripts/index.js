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

function Transfer() {
	sending = true
	console.log("sending")
	sendToken(document.getElementById("dest-select").value,document.getElementById("amount").value)
	console.log("post sending")
	var frm = document.getElementById("send");
	frm.reset();
	return false
}

const sendToken = async(address,amount) => {
	//Token.transfer(address,amount*Math.pow(10,18),function(err,result) {console.log("")})
	console.log("function sendToken reached")
	const transfer = (_address, _amount) =>{
		return new Promise(function(resolve, reject){
			Token.transfer(_address, _amount, (err, result) => {
				if (err) return reject (err);
				console.log("transfer execution");
				resolve(result);
				console.log(result)
			})
		})
	};

};