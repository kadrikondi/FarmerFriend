const accountSid = 'AC80b96e102503685aea63091e5a1fcd6d';
const authToken = '81b8b105a865225d5bfb11950b4036f8';
const client = require('twilio')(accountSid, authToken);
const moment = require('moment')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')
const { generateOTP } = require('./functions')

exports.generateOTP = async (req, res) => {
  try {
    let number = req.body.number
    const info = await User.findOne({fname:req.body.fname})
    //let number = info.phone
    let OTP = generateOTP(number) 
    let start_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    let next_time = moment().add(10, 'm').format('YYYY-MM-DD HH:mm:ss');
    let diff_milliseconds = Date.parse(next_time) - Date.parse(start_time);
    let diff_seconds = diff_milliseconds / 1000;
    info.start = start_time
    info.end = next_time
    info.otp = OTP
    await info.save()
    return res.json({
      message:'A message has been sent to your phone number',
      info:info
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

//check validity of OTP
exports.checkOTP = async (req, res) => {
  const info = await User.findOne({fname: req.body.fname})
  var checkDate = new Date()
  if( checkDate > info.end){
    info.otp = ""
    res.json({
      message:'Invalid OTP/OTP has expired'
    })
  }
  else{
    res.json({
      message:'OTP is still valid'
    })
  }
}

// register new user
exports.registerUser = async (req, res) => {
  try {
    const { sname, fname, lname, username, password, bvn, phone, email } = req.body
    if(!sname || !fname || !lname || !username || !password || !bvn || !email){
      return res.status(403).json({
        message:'Please fill all fields'
      })
    }
    else{
      const hash = bcrypt.hashSync(password, 10)
      const info = await User.create(req.body)
      info.password = hash
      await info.save()
      return res.status(201).json({
        message:'created',
        info:info
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

//login into the system
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if(!email || !password){
      return res.status(403).json({
        message:'Please fill all fields and try again'
      })
    }
    else{
      const user = await User.findOne({email:email})
      if(!user){
        return res.status(404).json({
          message:'Wrong email/password'
        })
      }
      else{
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if(!passwordIsValid){
          return res.status(404).json({
            message:'Wrong email/password'
          })
        }
        else{
          const token = await jwt.sign({id:user.id, email:user.id, bvn:user.bvn, fname:user.fname, lname:user.lname}, config.Usercode)
          return res.status(200).json({
            token:token,
            message:'login successful'
          })
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

//delete user
exports.deleteUserWithBanks = async (req, res) => {
  try {
    const info = await User.findOneAndDelete({_id: req.params.id})
    if(!info){
      return res.status(404).json({
        message:'User not found'
      })
    }
    else{
      return res.status(200).json({
        message:'user deleted'
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}