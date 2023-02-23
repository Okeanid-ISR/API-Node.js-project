const express = require("express");
const bcrypt = require("bcrypt");
const {auth} = require("../middlewares/auth");
const {validateJoi, UserModel, validateLogin, createToken} = require("../models/userModel");

const router = express.Router();

router.get("/", async (req, res) => {
    res.json({msg: "Users endpoint"});
})


router.get("/userInfo", auth, async (req, res) => {
    try {
        let user = await UserModel.findOne({_id: req.tokenData._id}, {password: 0})
        res.json(user)
    } catch (err) {
        console.log(err);
        res.status(502).json({err})
    }
})

router.post("/", async (req, res) => {
    let validateBody = new validateJoi(req.body)
    if (validateBody.error) {
        res.status(400).json(validateBody.error.details)
    }
    try {

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({msg:"This email is already exists in system!",code:1100})
        }
        console.log(error)
        res.status(502).json({error})
    }
})