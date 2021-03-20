const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userScheme = new Schema({
    name: {
        type: String,
        required: true,
        minlength:1,
        maxlength:25
    },
    coment: {
        type: String,
        required: true,
        minlength: 1,
        maxlength:255
    }
});
const User = mongoose.model("User", userScheme);

exports.getAllUsers = function(req, res){
    mongoose.connect("mongodb://localhost:27017/usersdb", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false}, function(err){
        if(err){
            console.log(err);
        }
    });

    User.find({}, function(err, users){
        mongoose.disconnect();
        if(err) return console.log(err);
        res.send(users);
    });
};

exports.postUser= function(req, res){
    const userName = req.body.userName;
    const userComent = req.body.userComent;
    const user = new User({name: userName, coment: userComent});
    console.log(req.body)
    mongoose.connect("mongodb://localhost:27017/usersdb", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false}, function(err){
        if(err){
            console.log(err);
        }
    });

    user.save(function(err){
        mongoose.disconnect();
        if(err) return console.log(err);
        res.send(user)
    });
};

exports.deleteUser=function(req, res){

    mongoose.connect("mongodb://localhost:27017/usersdb", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false}, function(err){
        if(err){
            console.log(err);
        }
    });
    console.log(req.params)
    const id = req.params.id;
    User.findByIdAndDelete(id, function(err, user){
        mongoose.disconnect();        
        if(err) return console.log(err);
        res.send(user);
    });
}

exports.updateUser=function(req,res){

    mongoose.connect("mongodb://localhost:27017/usersdb", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false}, function(err){
        if(err){
            console.log(err);
        }
    });

    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userComent = req.body.coment;
    const newUser = {name: userName, coment: userComent};
     
    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
        mongoose.disconnect();
        if(err) return console.log(err); 
        res.send(user);
    });
}