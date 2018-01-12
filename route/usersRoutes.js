const DB = require("../models/users.js")


function getAll(re,res,next){
	res.json(DB.LDB);
}

function getById(req,res,next){
	res.json( DB.LDBfindById(req.params.Id));
}
function getByPar(req,res,next){
	
	res.json( DB.LDBfindParamAndId(req.params.par,req.params.Id));
}
exports.get = function (req, res, next){
	var Id = req.query.Id;
	var Params = req.query.par;
	
	if(!Id && !Params){		
		getAll(req,res,next);
	} else {
		if(Id){
			if(!Params){
				getById(req,res,next);
			} else 
			getByPar(req,res,next);
		}	
	}
}

exports.add = function (req,res,next){
	email = req.body.email;
	name = req.body.name;
	surname = req.body.surname;
	
	var obj = {
		"email":email,
		"name":name,
		"surname":surname,
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
	email = req.body.newEmail;
	name = req.body.name;
	surname = req.body.surname;
	oldEmail = req.body.oldEmail;
	var obj = {
		"email":email,
		"name":name,
		"surname":surname,
	};
	
	var ret = DB.LDBupdate(obj, oldEmail);
	if (ret){
				res.sendStatus(200);
			} else {
				var error = new Error("Not inserted user");
				next(error);
			}
}
exports.remove = function (req,res,next){
	email = req.body.email;
	
	var ret = DB.LDBremove(email);
	if (ret){
				res.sendStatus(200);
			} else {
				var error = new Error("Not inserted user");
				next(error);
			}
}