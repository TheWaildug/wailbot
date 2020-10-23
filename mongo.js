const mongoose = require('mongoose')
const {mongopath} = require('./config.json')
module.exports = async () =>{
    await mongoose.connect(mongopath)
    return mongoose
}