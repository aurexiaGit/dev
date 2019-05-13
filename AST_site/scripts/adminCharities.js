const addCharity = async () => {
	// Called when clicking on Add button
	var _address = document.getElementById("adress1").value
	var _name = document.getElementById("name1").value

	const getCurAddress = () =>{                         
		return new Promise(function(resolve, reject){
		web3.eth.getAccounts((err, accounts) => {
			if (err) return reject(err);
			let result = accounts[0].toLowerCase();
			resolve(result);
		})
  	})};

	const addC = (address, name, curAddress) =>{                         
		return new Promise(function(resolve, reject){
			Token.addAssociation.sendTransaction(address,name,{from:curAddress},(err,result) => {
				if (err) return reject(err);
				resolve(result);
			})
	  	})
	};
	var frm = document.getElementById("addCharity");
	frm.reset();
	let _curAddress = await getCurAddress();
	let assigment = await addC(_address,_name, _curAddress)
	console.log(assigment)
	return false;
}

const remCharity = async () => {
	// Called when clicking on remove button
	var _address = document.getElementById("adress2").value
	const getCurAddress = () =>{                         
		return new Promise(function(resolve, reject){
		web3.eth.getAccounts((err, accounts) => {
			if (err) return reject(err);
			let result = accounts[0].toLowerCase();
			resolve(result);
		})
  	})};

	const remC = (address, curAddress) =>{                         
		return new Promise(function(resolve, reject){
			Token.remAssociation.sendTransaction(address,{from:curAddress},(err,result) => {
				if (err) return reject(err);
				resolve(result);
			})
	  	})
	};
	var frm = document.getElementById("remCharity");
	frm.reset();
	let _curAddress = await getCurAddress();
	let assigment = await remC(_address, _curAddress)
	console.log(assigment)
	return false;
}