var fileJSON = $.getJSON('http://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=0xc4d446c6B924c431f89214319D5A3e6bb67e7627&startblock=0&endblock=999999999&sort=asc&apikey=NSAMUW521D6CQ63KHUPRQEERSW8FVRAF9B', function(data) {
    //data is the JSON string
});
console.log(fileJSON)
/*
getJSON('http://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=0xc4d446c6B924c431f89214319D5A3e6bb67e7627&startblock=0&endblock=999999999&sort=asc&apikey=NSAMUW521D6CQ63KHUPRQEERSW8FVRAF9B',
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
	alert('Your query count: ' + data.query.count);
	console.log
  }
});
*/