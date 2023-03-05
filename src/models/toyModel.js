import Joi from 'joi'

import mongoose from 'mongoose'

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
  user_id: String
})

export const ToyModel = mongoose.model('toys', toySchema)

export function validateToy(_reqBody) {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    info: Joi.string().min(2).max(600).required(),
    category: Joi.string().min(2).max(50).required(),
    img_url: Joi.string().min(2).max(150).allow(null, ''),
    price: Joi.number().min(2).max(5000).required()
  })
  return joiSchema.validate(_reqBody)
}