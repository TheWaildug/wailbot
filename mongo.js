const mongoose = require('mongoose')
const { mongPpath } = require('./config.json')
module.exports = async () =>{
    await mongoose.connect(mongopath)
    return mongoose
}