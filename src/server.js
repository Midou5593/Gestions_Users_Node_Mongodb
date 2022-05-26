// importation du package http pour avoir les outils pour  creer le server 
const http = require('http');

//pour utiliser les variables d'environnement
const dotenv = require('dotenv');

//importer l'application  app
const app = require("./app");

//parametrage du port avec la methode set de express
dotenv.config();
app.set('port',process.env.SERVER_PORT);

//creation du serveur
const server = http.createServer(app);

//ecoute des requetes sur le port
server.listen(process.env.SERVER_PORT,()=>{
    console.log("Server Started.!");
});

