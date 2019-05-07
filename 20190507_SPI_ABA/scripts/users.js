//update drop-down list
//var select = document.getElementById("dest-select");

try {
	var select = document.getElementById("dest-select");
  }
  catch(err) {
	console.log(err.message);
  }
  console.log("Post select")
  for (var key in users){
	  if (users.hasOwnProperty(key) && key !== "admin") {
		  var opt = document.createElement('option');
	  opt.value = users[key].adress;
	  opt.innerHTML = users[key].name;
	  select.appendChild(opt);
	  }
  }

var charity = {
			"cravate": {
				"adress": "0x48BC8f1c04940da24349a7c9cdeC2040A860C3fe",			// adresse de l'ancien contrat
				"name": "La Cravate Solidaire"
			}
}


