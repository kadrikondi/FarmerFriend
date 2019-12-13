const express = require('express')
const router = express.Router()
const usercontroller = require('../controllers/user')
const bankcontroller = require('../controllers/bank')

router.put('/generate', usercontroller.generateOTP)
router.post('/check', usercontroller.checkOTP)
router.post('/register', usercontroller.registerUser)
router.post('/login', usercontroller.loginUser)

//banks
router.post('/createbank', bankcontroller.createBank)
router.put('/updatebank/:id', bankcontroller.updateBank)

module.exports = router;