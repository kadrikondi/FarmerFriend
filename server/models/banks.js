const mongoose = require('mongoose')
const bankSchema = new mongoose.Schema({
    bankname: String,
    account: Number,
    userid: String,
    bvn:String,
    transaction:String
})

module.exports = mongoose.model('banks', bankSchema)