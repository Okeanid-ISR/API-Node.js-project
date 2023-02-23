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
    let validateBody = validateJoi(req.body)
    if (validateBody.error) {
        res.status(400).json(validateBody.error.details)
    }
    try {
        let user = new UserModel(req.body)
        user.password = await bcrypt.hash(user.password, 10)
        await user.save()
        user.password = "**********"
        res.status(201).json(user)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({msg: "This email is already exists in system!", code: 1100})
        }
        console.log(error)
        res.status(502).json({error})
    }
})

router.post("/login", async (req, res) => {
    let validateBody = validateLogin(req.body)
    if (validateBody.error) {
        res.json(validateBody.error.details)
    }
    try {
        let user = await UserModel.findOne({email: req.email.body})
        if (!user) {
            return res.status(401).json({error:"Email not found!"})
        }

        let passwordValid = await bcrypt.compare(req.body.password, user.password)
        if(!passwordValid){
            return res.status(401).json({error:"Password was wrong!"})
        }

        let token = createToken(user._id)

        return res.json({token})

    } catch (error) {
        console.log(error);
        res.status(502).json({error})
    }
})

module.exports = router;