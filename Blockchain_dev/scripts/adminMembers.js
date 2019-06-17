const addMember = async () => {
	// Called when clicking on Add button
	var _address = document.getElementById("adress1").value;
	var _name = document.getElementById("name1").value;
	_name = web3.fromAscii(_name); //car le smart contract stocke les noms en bytes 
	var _grade = document.getElementById ("grade1").value;

	const addM = async (address,name,grade) =>{                         
		return new Promise(function(resolve, reject){
			Token.addToAurexiaMembers(address,name,grade,(err,result) => {
				if (err) return reject(err);
				resolve(result);
			})
	  	})
	};
	let assigment = await addM(_address,_name,_grade)
	var frm = document.getElementById("addMember");
	frm.reset();
	return false;
}

const remMember = async () => {
	// Called when clicking on remove button
	var _address = document.getElementById("adress2").value;

	const remM = async (address) =>{                      
		return new Promise(function(resolve, reject){
			Token.remAurexiaMembers(address,(err,result) => {
				if (err) return reject(err);
				resolve(result);
			})
	  	})
	};
	let assigment = await remM(_address)
	var frm = document.getElementById("remMember");
	frm.reset();
	return false
}

async function massAssign(){

	async function csvRead(local) {
	  return new Promise (function(resolve, reject){
		const csv = require('csv-parser');  
		const fs = require('fs');
		
		let nameList = [];
		let addressList = [];
		let seedList = [];
		let gradeList = [];
		fs.createReadStream(local)  
		.pipe(csv())
		.on('data', (row) => {
		  nameList.push(row.Name);
		  gradeList.push(row.Grade);
		  addressList.push(row.Address);
		  seedList.push(row.Seed);
		})
		.on('end', () => {
		  console.log('CSV file successfully processed');
		  let result=[];
		  result.push(nameList);
		  result.push(addressList);
		  result.push(seedList);
		  result.push(gradeList)
		  if (result=="") return reject(result);
		  resolve (result);
		})
	  })
	}
	
	let allData = await csvRead("massAssignement.csv");
	console.log("result Data");
	console.log(allData);
	let taille = allData[0].length;
	for (let i=0; i<taille; i++){
		allData[0][i] = web3.fromAscii(allData[0][i]);
	}

	const massAssignement = async (address, name, grade, _taille) =>{                        
		return new Promise(function(resolve, reject){
			Token.getAllInfoTransaction(address, name, grade, _taille,(err, members) => {
			if (err) return reject(err);
			resolve(members);
	  	})
	})}

	let assign = await massAssignement(allData[1],allData[0],allData[2],taille);
	return false;
}



