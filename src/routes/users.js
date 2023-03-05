import express from 'express'

import bcrypt from 'bcrypt'

import {auth} from '../middlewares/auth.js'

import { createToken, UserModel, validateLogin, validateUser } from '../models/userModel.js'

const usersR = express.Router()

usersR.get('/', async (req, res) => {
  res.json({ msg: 'Users endpoint' })
})

usersR.get('/userInfo', auth, async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 })
    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(502).json({ err })
  }
})

usersR.post('/', async (req, res) => {
  let validateBody = validateUser(req.body)
  if (validateBody.error) {
    res.status(400).json(validateBody.error.details)
  }
  try {
    let user = new UserModel(req.body)
    user.password = await bcrypt.hash(user.password, 10)
    await user.save()
    user.password = '**********'
    res.status(201).json(user)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ msg: 'This email is already exists in system!', code: 1100 })
    }
    console.log(error)
    res.status(502).json({ error })
  }
})

usersR.post('/login', async (req, res) => {
  let validBody = validateLogin(req.body)
  if (validBody.error) {
    return res.status(400).json(validBody.error.details)
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ err: 'Email was not found!' })
    }
    let passwordValid = await bcrypt.compare(req.body.password, user.password)
    if (!passwordValid) {
      return res.status(401).json({ err: 'Password was wrong!' })
    }
    let token = createToken(user._id)

    return res.json({ token })
  } catch (err) {
    console.log(err)
    res.status(502).json({ err })
  }
})

export default usersR
