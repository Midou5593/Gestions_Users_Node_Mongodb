//importer le model de la base de données 
const User = require('../models/User');
// pour hasher le mot de passe
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');


//enregistter un nouveau user dans mongodb local
exports.signUp= async(req,res,next)=>{
     const {nom,prenom,username,age,password,confirmpassword} = req.body;
     console.log("*****************")
     console.log(req.body);
        if(
            !nom ||
            !prenom ||
            !username ||
            !age ||
            !password ||
            !confirmpassword ||
            typeof nom != "string" ||
            typeof prenom != "string" ||
            typeof username != "string" ||
            typeof age != "number" ||
            typeof password != "string" ||
            typeof confirmpassword != "string" 
        )
        {
            res.send("Veuillez Remplir tous les champs requis");
            return;
        }
        if(password != confirmpassword){
            res.send("Les deux champs password doivent etre identique");
            return;
        }
        else{
            await User.findOne({username},async(err,doc)=>{
                if(err) throw err;
                if(doc){
                    res.status(400).json({message:"Le nom d'utilisateur exist dejas"});
                    return;
                }
                else if(!doc){
                    const hashPassword = await bcrypt.hash(password,10);
                    const newUser = new User({
                        nom,
                        prenom,
                        username,
                        age,
                        password:hashPassword,
                        confirmpassword:hashPassword
                    });
                    try {
                        const user = await newUser.save();
                        res.status(201).json(user);
                    } catch (error) {
                        res.status(500).json({message:error});
                    }
                }
            })
        }
};
//
exports.readAllUser = async(req,res,next)=>{
    await User.find({})
              .then((data)=>{
                      res.status(200).json(data);
              })
              .catch((err)=>{
                     res.status(500).json({error:err});
              })
};

exports.readOneUser = async(req,res,next)=>{
    await User.findOne({_id:req.params.id})
              .then((data)=>{
                  console.log(data);
                res.status(200).json(data);
              })
              .catch((err)=>{
                res.status(500).json({error:err});
              })
};

exports.updateUser = async(req,res,next)=>{
    const {nom,prenom,username,age,password,confirmpassword} = req.body;

    const hashPassword = await bcrypt.hash(password,10);
    
    await User.updateOne({_id:req.params.id},{nom,prenom,username,age,password:hashPassword,confirmpassword:hashPassword})
              .then((data)=>{
                console.log(data);
                res.status(200).json({message:"Object mis a jour"});
              })
              .catch((err)=>{
                res.status(500).json({error:err});
              })
};
exports.deleteUser = async(req,res,nex)=>{
    await User.deleteOne({_id:req.params.id})
              .then((result)=>{
                  if(result){
                      res.status(200).json({message:"Object Supprimer"});
                  }
              })
              .catch((err)=>{
                  res.status(500).json({error:err});
              })
}