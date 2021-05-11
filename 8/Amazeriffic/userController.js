var User = require("./user.js"),
    ToDo = require("./todo.js");
var username=null
var UsersController = {};

UsersController.login = function(req,res){
    
    username = req.body.login
    
    if(username==="admin"){
        User.findOne({username:username}, function (err, user) {
            if (err !== null) {
                res.json({message:"no"});
            } else {
                res.status(200).json({message:"yes",admin:true});
            }
        });
    }else if(username){
        User.findOne({"username":username}, function (err, user) {
            
            if (user === null) {
                res.json({message:"no"});
            } else {
                res.status(200).json({message:"yes",admin:false});
            }
        });
    }
}

UsersController.registration = function(req,res){
    
    username = req.body.login
    if(username){
        User.findOne({username:username}, function (err, user) {
            if (user === null) {
                var newUser = new User({
                    "username": username
                });
                newUser.save(function (err, result) {
                    if (err !== null) {
                        
                    }
                });
                res.json({message:"yes"});
            } else {
                res.status(200).json({message:"no"});
            }
        });
    }
}

UsersController.index = function (req, res) {
    
    username = req.params.username || null
    var respondWithToDos = function (query) { 
        User.find(query, function (err, users) {
            if (err !== null) {
                res.json(500, err);
            } else {
                res.status(200).json(users);
            }
        });
    };
    if (username !== null) {
        
        User.find({"username": username}, function (err, result) {
            if (err !== null) {
                res.json(500, err);
            } else if (result.length === 0) {
                res.status(404).json({"result_length": 0});
            } else {
                
                respondWithToDos({"owner": result[0]._id});
            }
        });
    } else {
        respondWithToDos({});
    }
};

UsersController.create = function (req, res) {
	var newUser = new User({
		"username": req.body.username
	});

	newUser.save(function (err, result) {        
        if (err !== null) {            
            res.json(500, err);
        } else {
            res.status(200).json(result);
        }
    });
};

UsersController.update = function (req, res) {
    var id = req.params.id;
    var newUser = {$set: {username: req.body.username}};
    User.updateOne({"_id": id}, newUser, function (err, user) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (user.n === 1 && user.nModified === 1 && user.ok === 1) {
                res.status(200).json(user);
            } else {
                res.status(404).json({"status": 404});
            }
        }
    });
};

UsersController.remove = function (req, res) {
    var id = req.params.id;
    ToDo.deleteMany({"owner": id}, function(err, result){
        
    });
    User.deleteOne({"_id": id}, function (err, user) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (user.n === 1 && user.ok === 1 && user.deletedCount === 1) {
                res.status(200).json(user);
            } else {
                res.status(404).json({"status": 404});
            }
        }
    });
};
module.exports = UsersController;