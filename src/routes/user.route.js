const express = require('express');
const  userController = require('../controllers/user.controler')

const route = express.Router();

//route signup ou creation user
route.post("/signup",userController.signUp);
//route pour lire(recuperer) toutes les users dans mongodb loacal
route.get("/",userController.readAllUser)
//route pour lire un user par userID 
route.get("/:id",userController.readOneUser);
//route pour modifier un user par userID 
route.put("/:id",userController.updateUser)

//route pour supprimer un user par userID
route.delete("/:id",userController.deleteUser);




module.exports = route;