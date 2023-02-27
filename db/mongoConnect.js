const mongoose = require('mongoose');
const config = require('../config/secret').config

const mongoURL = `mongodb+srv://${config.mongoUser}:${config.mongoPass}@cluster0.zg221i8.mongodb.net/fullstack23`

main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURL);
    console.log("mongo connected");
}