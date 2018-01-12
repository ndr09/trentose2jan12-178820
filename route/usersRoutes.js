const DB = require("../models/users.js")


function getAll(re,res,next){
	res.json(DB.LDB);
}

function getById(req,res,next){
	res.json( DB.LDBfindById(req.params.id));
}
function getByPar(req,res,next){
	
	res.json( DB.LDBfindParamAndId(req.params.par,req.params.Id));
}
exports.get = function (req, res, next){
	id = req.params.id;
	if(!id){		
		getAll(req,res,next);
	} else {
			getById(req,res,next);
		}	
}
exports.getSur = function (req, res, next){
	lastname = req.params.lastName;
	res.json( DB.LDBfindBysur(req.params.lastName));
}

exports.add = function (req,res,next){
	lastName = req.body.lastName;
	firstName = req.body.firstName;
	isInspace = req.body.isInSpace;
	
	var obj = {
		"id": DB.LDB.length,
		"lastName":lastName,
		"firstName":firstName,
		"isInspace":isInspace,
	};
	
	var ret = DB.LDBput(obj);
	if (ret){
				res.sendStatus(200);
			} else {
				var error = new Error("Already inserted user");
				next(error);
			}
}
exports.update = function (req,res,next){
	lastName = req.body.lastName;
	firstName = req.body.firstName;
	isInspace = req.body.isInspace;
	id = req.params.id;
	var obj = {
		"lastName":lastName,
		"firstName":firstName,
		"isInspace":isInspace,
	};
	
	var ret = DB.LDBupdate(obj, id);
	if (ret){
				res.sendStatus(200);
			} else {
				var error = new Error("Not inserted user");
				next(error);
			}
}
