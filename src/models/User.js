const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom:{
    type:String,
    required:true,
    },
    prenom:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("user",userSchema);