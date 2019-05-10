/***************************************************************** */
/*                     Creation de token                           */
/***************************************************************** */

const reloadPage = async (_transfert) =>{
	console.log(_transfert);
	var frm = document.getElementById("addMember");
	frm.reset();
}

const createTokens = async () => {

	var amount = document.getElementById("amount1").value
	amount = amount * Math.pow(10,18);
	var address = document.getElementById("adress1").value

	const getCurAddress = () =>{                         
		return new Promise(function(resolve, reject){
		web3.eth.getAccounts((err, accounts) => {
			if (err) return reject(err);
			let result = accounts[0].toLowerCase();
			resolve(result);
		})
	  })};

	const create = async (_curAddress, _address, _amount) =>{

		Token.mint(_address,_amount, {from: _curAddress}, (err,result) => {
			if (err) throw (err);
			console.log(result);
		})
		return result;
	}
	let curAddress = await getCurAddress();
	let transfert = await create(curAddress, address, amount);
	console.log(transfert);
	return reloadPage(transfert);
}


/***************************************************************** */
/*                     Suppression de token                        */
/***************************************************************** */

const destroy = async (_curAddress, _address, _amount) =>{

	Token.burn(_address,_amount, {from: _curAddress}, (err,result) => {
		if (err) throw (err);
		console.log(result);
	})
	return result;
}

const destroyTokens = async () => {

	var amount = document.getElementById("amount2").value
	amount = amount * Math.pow(10,18);
	var address = document.getElementById("adress2").value

	const getCurAddress = () =>{                         
		return new Promise(function(resolve, reject){
		web3.eth.getAccounts((err, accounts) => {
			if (err) return reject(err);
			let result = accounts[0].toLowerCase();
			resolve(result);
		})
	  })};

	var frm = document.getElementById("supMember");
	frm.reset();
	let curAddress = await getCurAddress();
	return destroy(curAddress, address, amount);
}