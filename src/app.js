const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Pour logger les RequettesHttp
const morgan = require('morgan')
const userRoutes = require('./routes/user.route')

//  importation et  Connection a la base de données
const db = require('./db/db');
db.db();

//Creer une Application express
const app = express();

// logger les req et les res
app.use(morgan("dev"));

//debug mongoose
console.log("-----------------debug logger mongoose");
mongoose.set('debug',true);

// transformer le corps (body) en json object javascript utilisables
app.use(bodyParser.json());

app.use(express.json());


// route users
app.use("/api/users", userRoutes);




//exportation de l'app
module.exports = app;