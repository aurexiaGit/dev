const resetAdd = () => {
	var frm = document.getElementById("addMember");
	frm.reset();
}


const addMember = async () => {
	// Called when clicking on Add button
	var _address = document.getElementById("adress1").value
	var _name = document.getElementById("name1").value
	var _grade = document.getElementById ("grade1").value

	const addM = (address,name,grade) =>{                         
		return new Promise(function(resolve, reject){
			Token.addToAurexiaMembers(address,name,grade,(err,result) => {
				if (err) return reject(err);
				resolve(result);
			})
	  	})
	};
	let assigment = await addM(_address,_name,_grade)
	console.log(assigment)
	return resetAdd()
}

function remMember() {
	// Called when clicking on remove button
	var address = document.getElementById("adress2").value
	Token.remAurexiaMembers(address,function(err,result) {console.log("")})
	var frm = document.getElementById("remMember");
	frm.reset();
	return false
}
