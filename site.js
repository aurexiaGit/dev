
var web3 = new Web3(Web3.currentProvider)
window.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/fb7c0bd217a740f6981ed2274e40d771"))


// Import the contract artifact and turn it into usable an abstraction
var Test = contract('dApp/build/contracts/Test.json');

function sayHello() {
  Test.deployed().then(function(instance) {
    return instance.sayHello();
  }).then(function(result) { 
    watchingForEvents = true;
})}

web3.eth.getBalance("0x9a1a785ef4906e1e29e96e3eb5fa4dae8bf4c599", (err, balance) => {
    const balanceInEth = web3.fromWei(balance, "ether");
    console.log(`balance ${balanceInEth} ether`);
  });
