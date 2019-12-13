const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    sname: String,
    fname: String,
    lname: String,
    username: String,
    password: String,
    bvn: String,
    phone:Number,
    email:String,
    otp: {type:String},
    banks: String,
    start: {type: Date},
    end:{ type: Date}
})

module.exports = mongoose.model('users', userSchema)