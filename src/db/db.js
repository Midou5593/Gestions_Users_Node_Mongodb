//importer mongoose pour se connecter a la base de données locale mongoDB
const mongoose = require('mongoose');

const dotenv = require('dotenv');



dotenv.config();
exports.db = ()=>{
    mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASSWORD}@localhost:27017/${process.env.DB_NAME}`,(err)=>{
        if(err) throw err;
        console.log("Connected to Database!");
     }) ;
};

