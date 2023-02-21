const express = require("express");
const {validateToy, ToyModel} = require("../models/toyModel");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let data = await ToyModel.find({}).limit(10)
        res.json(data)

    } catch (err) {
        console.log(err)
        res.status(502).json(err)
    }
})

module.exports = router;