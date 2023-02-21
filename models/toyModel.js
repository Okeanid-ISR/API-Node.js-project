const mongoose = require("mongoose")
const Joi = require("joi")
const { config } = require("../config/secret");

let toySchema = new mongoose.Schema({
    name: String,
    info: String,
    category: String,
    img_url: String,
    price: Number,
    date_created: {
        type: Date,
        default: Date.now
    },
    user_id:String,
})

exports.ToyModel = mongoose.model("toys", toySchema)

exports.validateToy = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(150).required(),
        info: Joi.string().min(2).max(350).required(),
        category: Joi.number().min(2).max(30).required(),
        img_url: Joi.string().min(2).max(150).allow(null,""),
        price: Joi.string().min(2).max(5000).required(),
    })
    return joiSchema.validate(_reqBody)
}