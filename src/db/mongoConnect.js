import mongoose from 'mongoose'
import { mongoPass, mongoUser } from '../config/secret.js'

const mongoURL = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.zg221i8.mongodb.net/fullstack23`

export default mongoURL

export async function main() {
  mongoose.set('strictQuery', false)
  await mongoose.connect(mongoURL)
  console.log('mongo connected')
}
