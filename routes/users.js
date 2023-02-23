const express = require("express");
const bcrypt = require("bcrypt");
const {auth} = require("../middlewares/auth");
const { validateJoi, UserModel, validateLogin, createToken } = require("../models/userModel");

const router = express.Router();

router.get("/", async(req,res) => {
    res.json({msg:"Users endpoint"});
})


router.get("/userInfo", auth , async(req,res) => {
    try{
        let user = await UserModel.findOne({_id:req.tokenData._id},{password:0})
        res.json(user)
    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }
})