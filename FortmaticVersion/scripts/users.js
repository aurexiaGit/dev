var users = {
			"admin":{
				"adress": "0x9cA10A8C595FFC15Ffa99B61d71Dc561e0aE1914",
				"name": "ADMINSTRATOR",
				"pic":"images/admin.png"
			},
			
			"test":{
				"adress": "0x1Ce55e93178D03a40c59af4527F56B3Baa24d241",
				"name": "Test",
				"pic":"images/blank.png"
			}
		}



pragma solidity >=0.4.16 <0.6.0;

contract store {
    
    struct Member {
        string name;
    }
    
    mapping(address => Member) members;
    address[] public membersAccts;
    
    function setMember(address _address, string memory _name) public {
        Member storage member = members[_address];
        member.name = _name;
        membersAccts.push(_address) -1;

    }
    
    function getMembers() view public returns (address[] memory) {
        return membersAccts;
    }
    
    function getMember(address ins) view public returns (string memory) {
        return (members[ins].name);
    }
}