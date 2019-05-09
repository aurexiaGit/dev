// ******************************************* 
//Test update amount value after sending tokens
console.log(ethereum.isMetaMask)
window.ethereum.on('accountsChanged', function (accounts) {
	// Time to reload your interface with accounts[0]!
	console.log("detects change")
	alert("change detected!")
  })

/*
var myobj = {a : 1};

function watch(obj, prop, handler) { // make this a framework/global function
    var currval = obj[prop];
    function callback() {
        if (obj[prop] != currval) {
            var temp = currval;
            currval = obj[prop];
            handler(temp, currval);
        }
    }
    return callback;
}

var myhandler = function (oldval, newval) {
	console.log("seems to work")
	document.getElementById("astValue").innerHTML = newval.toString() + " AST"
	console.log(oldval)
	console.log(newval)
	
};

var intervalH = setInterval(watch(myobj, "a", myhandler), 100);

myobj.set_a(2);
*/
/*
var MyContract = web3.eth.contract(abi);
var myContractInstance = MyContract.at('0x78e97bcc5b5dd9ed228fed7a4887c0d7287344a9');
// watch for an event with {some: 'args'}
var myEvent = myContractInstance.myEvent({some: 'args'}, {fromBlock: 0, toBlock: 'latest'});
myEvent.watch(function(error, result){
  ...
});
// would get all past logs again.
var myResults = myEvent.get(function(error, logs){ ... });
...
// would stop and uninstall the filter
myEvent.stopWatching();
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
  