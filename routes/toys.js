const express = require("express");
const {validateToy, ToyModel} = require("../models/toyModel");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let data = await ToyModel
            .find({})
            .limit(10)


        res.json(data)

    } catch (err) {
        console.log(err)
        res.status(502).json(err)
    }
})

router.post("/", async (req, res) => {
    let validBody = validateToy(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    try {
        let toy = new ToyModel(req.body)
        await toy.save();
        res.json(toy)

    } catch (error) {
        console.log(error)
        res.status(502).json({error})
    }

})

router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id
        let data = await ToyModel.deleteOne({_id: id})
        res.json(data)

    } catch (error) {
        console.log(error)
        res.status(502).json({error})
    }
})



module.exports = router;