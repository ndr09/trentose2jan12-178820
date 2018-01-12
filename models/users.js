var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LDB = [];

function LDBput(obj){
	var id = obj.id;
	var bool = true;
	for(var i =0; i< LDB.length;i++){

		if(LDB[i]["id"]==id){
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
		if(LDB[i]["id"]==id){
			list.push(LDB[i]);
		}
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
function LDBupdate(obj, id){
	var bool = false;
	for(var i =0; i< LDB.length;i++){

		if(LDB[i]["id"]==id){
			if(obj.firstName){
				LDB[i]["firstName"] = obj.firstName;
			}
			if(obj.lastName){
				LDB[i]["lastName"] = obj.lastName;
			}
			if(obj.isInspace){
				LDB[i]["isInspace"] = obj.isInspace;
			}
			bool = true;
		}
	}
	return bool;
}
function LDBremove(id){
	var index=-1;
	var bool = false;
	for(var i =0; i< LDB.length;i++){
		if(LDB[i]["id"]==id){
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
