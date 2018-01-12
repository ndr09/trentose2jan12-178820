var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LDB = [];

function LDBput(obj){
	var email = obj.email;
	var bool = true;
	for(var i =0; i< LDB.length;i++){

		if(LDB[i]["email"]==email){
			bool = false;
		}
	}
	if(bool){
		LDB.push(obj);
	}
	return bool;
}

function LDBfind(obj){
	for(var i =0; i< LDB.length;i++){
		if(LDB[i]==obj)
		return i;
	}
}
function LDBfindById(id){
	var list =[];
	for(var i =0; i< LDB.length;i++){
		if(LDB[i]["email"]==id)
		list.push(LDB[i]);
	}
	return list
}
function LDBfindParamAndId(param,value){
	var list =[];
	for(var i =0; i< LDB.length;i++){
		if(LDB[i][param]==value)
		list.push(LDB[i]);
	}
	return list
}
function LDBupdate(obj, email){
	var bool = false;
	for(var i =0; i< LDB.length;i++){

		if(LDB[i]["email"]==email){
			if(obj.email){
				LDB[i]["email"] = obj.email;
			}
			if(obj.name){
				LDB[i]["name"] = obj.name;
			}
			if(obj.surname){
				LDB[i]["surname"] = obj.surname;
			}
			bool = true;
		}
	}
	return bool;
}
function LDBremove(email){
	var index=-1;
	var bool = false;
	for(var i =0; i< LDB.length;i++){
		if(LDB[i]["email"]==email){
			index = i;
			bool = true
			i = LDB.length;
		}
	}
	if(index != -1){
		LDB.splice(index, 1);
	}
	return bool;
}

module.exports = {
	'LDB' : LDB,
	'LDBput': LDBput,
	'LDBfind': LDBfind,
	'LDBfindById': LDBfindById,
	'LDBfindParamAndId': LDBfindParamAndId,
	'LDBupdate': LDBupdate,
	'LDBremove': LDBremove,
};
