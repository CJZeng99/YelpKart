const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trackSchema = new Schema({
    name: String,
    price: String,
    record: String,
    location: String
})

module.exports = mongoose.model('Track', trackSchema)