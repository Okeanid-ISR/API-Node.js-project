const express = require("express");
const bcrypt = require("bcrypt");
const {auth} = require("../middlewares/auth");
const { validateJoi, UserModel, validateLogin, createToken } = require("../models/userModel");

const router = express.Router();

router.get("/", async(req,res) => {
    res.json({msg:"Users endpoint"});
})
