const accountSid = 'AC125e4e6e6df47686794bf643c148ad90';
const authToken = '2923597349e51ae470e952507378dc6a';
const client = require('twilio')(accountSid, authToken);
const moment = require('moment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/config')
const {
  generateOTP
} = require('./functions')

exports.generateOTP = async (req, res) => {
  try {
    const info = await User.findOne({
      email: req.body.email
    })
    console.log(info)
    let number = "0" + info.phone
    console.log(number)
    if (!number) {
      res.json({
        message: 'Phone number not valid'
      })
    }
    else {
      let OTP = generateOTP(number)
      console.log(OTP)
      let start_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      let next_time = moment().add(10, 'm').format('YYYY-MM-DD HH:mm:ss');
      let diff_milliseconds = Date.parse(next_time) - Date.parse(start_time);
      let diff_seconds = diff_milliseconds / 1000;
      info.start = start_time
      info.end = next_time
      info.otp = OTP
      await info.save()
      console.log(info)
      return res.json({
        message: 'A message has been sent to your phone number',
        info: info
      })
    }
    //let number = info.phone
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: error.message
    })
  }
}

//check validity of OTP
exports.checkOTP = async (req, res) => {
    console.log("date  "+new Date())
  const info = await User.findOne({
    email: req.body.email
  })
  // console.log(info)

  var checkDate =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  console.log(checkDate)
  if (checkDate > info.end) {
    info.otp = ""
    res.json({
      message: 'Invalid OTP/OTP has expired'
    })
  } else {
    res.json({
      message: 'OTP is still valid'
    })
  }
}

// register new user
exports.registerUser = async (req, res) => {
  try {
    const {
      sname,
      fname,
      lname,
      username,
      password,
      bvn,
      phone,
      email
    } = req.body
    if (!fname || !lname || !username || !password || !bvn || !email || !phone) {
      return res.status(403).json({
        message: 'Please fill all fields'
      })
    } else {
      const hash = bcrypt.hashSync(password, 10)
      const info = await User.create(req.body)
      info.password = hash
      await info.save()
      return res.status(201).json({
        message: 'created',
        info: info
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      errrp: 'error backend'
    })
  }
}

//login into the system
exports.loginUser = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body
    if (!email || !password) {
      return res.status(403).json({
        message: 'Please fill all fields and try again'
      })
    } else {
      const user = await User.findOne({
        email: email
      })

      if (!user) {
        return res.status(404).json({
          message: 'No such user Go create account'
        })
      } else {
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        console.log(`${passwordIsValid}  ${password}`)
        if (!passwordIsValid) {
          return res.status(404).json({
            message: 'Wrong email/password'
          })
        } else {
          const token = await jwt.sign({
            id: user.id,
            email: user.id,
            bvn: user.bvn,
            fname: user.fname,
            lname: user.lname,
            username:user.username
          }, config.Usercode)
          let phone = user.phone
          let email = user.email
          return res.status(200).json({
            token: token,
            message: 'Login successful',
            phone: phone,
            email: email
          })
        }
      }
    }
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: error.message
    })
  }
}

//delete user
exports.deleteUserWithBanks = async (req, res) => {
  try {
    const info = await User.findOneAndDelete({
      _id: req.params.id
    })
    if (!info) {
      return res.status(404).json({
        message: 'User not found'
      })
    } else {
      return res.status(200).json({
        message: 'user deleted'
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

exports.confirmOTP = async (req, res) => {
  try {
    const info = await User.findOne({otp: req.body.otp})
    if(!info) {
      return res.status(404).json({
        message: 'Invalid otp'
      })
    }
    else {
      var checkDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      console.log(checkDate)
      if (checkDate > info.end) {
        info.otp = ""
        res.json({
          message: 'Invalid OTP/OTP has expired'
        })
      } else {
         return res.status(200).json({
           message: 'success'
         })
      }
     
    }
  } catch (error) {
    console.log(error.message)
  }
}
