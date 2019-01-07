
var web3 = new Web3(Web3.currentProvider) 


// Import the contract artifact and turn it into usable an abstraction
var Test = contract('dApp/build/contracts/Test.json');

function sayHello() {
  Test.deployed().then(function(instance) {
    return instance.sayHello();
  }).then(function(result) { 
    watchingForEvents = true;
})}