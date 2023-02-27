import jwt from 'jsonwebtoken'

import { config } from '../config/secret'

import Joi from 'joi'

import mongoose from 'mongoose'

let schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date_created: {
    type: Date,
    default: Date.now
  },
  role: String
})

export const UserModel = mongoose.model('users', schema)

export function createToken(user_id) {
  let token = jwt.sign({ _id: user_id }, config.tokenSecret, { expiresIn: '600mins' })
  return token
}

export function validateUser(_reqBody) {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    email: Joi.string().min(1).max(300).email().required(),
    password: Joi.string().min(1).max(100).required(),
    role: Joi.string().min(4).max(5).required()
  })

  return joiSchema.validate(_reqBody)
}

export function validateLogin(_reqBody) {
  let joiSchema = Joi.object({
    email: Joi.string().min(1).max(300).email().required(),
    password: Joi.string().min(1).max(100).required(),
    role: Joi.string().min(4).max(5).required()
  })

  return joiSchema.validate(_reqBody)
}
