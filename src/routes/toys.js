import express, { Router } from 'express'

import { ToyModel, validateToy } from '../models/toyModel.js'
import { auth } from '../middlewares/auth.js'

const toysR = Router()

toysR.get('/', async (req, res) => {
  let sort = req.query.sort || '_id'
  let perPage = req.query.perPage ? Math.min(req.query.perPage, 10) : 5
  let page = req.query.page ? req.query.page - 1 : 0
  // http://localhost:3001/books?page=2
  try {
    let data = await ToyModel.find({})
      .limit(perPage)
      .skip(page * perPage)
      .sort({ [sort]: 1 })

    // http://localhost:3001/books?perPage=5&sort=cat_url
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(502).json({ err })
  }
})
toysR.post('/', auth, async (req, res) => {
  let validBody = validateToy(req.body)
  if (validBody.error) {
    return res.status(400).json(validBody.error.details)
  }

  try {
    let toy = new ToyModel(req.body)

    await toy.save()
    res.json(toy)
  } catch (error) {
    console.log(error)
    res.status(502).json({ error })
  }
})

toysR.delete('/:id', auth, async (req, res) => {
  try {
    let id = req.params.id
    let data = await ToyModel.deleteOne({ _id: id })
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(502).json({ error })
  }
})

toysR.get('/search', async (req, res) => {
  try {
    let s = req.query.s
    let data = await ToyModel.find({ name: s })
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(502).json({ err })
  }
})

toysR.get('/category', async (req, res) => {
  try {
    let cat = req.query.cat
    let data = await ToyModel.find({ category: cat })
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(502).json({ err })
  }
})

toysR.get('/single/:id', async (req, res) => {
  const toyId = req.params.id

  try {
    const toy = await ToyModel.findOne({ _id: toyId })
    res.json(toy)
  } catch (error) {
    console.log(error)
    res.status(502).json({ error })
  }
})

toysR.put('/:id', auth, async (req, res) => {
  let validateBody = validateToy(req.body)
  if (validateBody.error) {
    res.status(400).json(validateBody.error.details)
  }

  try {
    let id = req.params.id
    let data = await ToyModel.updateOne({ _id: id }, req.body)
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(502).json({ error })
  }
})

export default toysR
