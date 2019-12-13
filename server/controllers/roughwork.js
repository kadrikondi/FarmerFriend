// const authenticator = require('otplib/authenticator');
// const crypto =  require('crypto');
 
// authenticator.options = { crypto };
// const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD'
// const token = authenticator.generate(secret);
// //const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';
// // Alternatively: const secret = otplib.authenticator.generateSecret();
 
// //const secret = otplib.authenticator.generateSecret();
//  console.log(token)
// try {
//     //const isValid = otplib.authenticator.check(token, secret);
//     // or
//     const isValid = otplib.authenticator.verify({ token, secret });
//     console.log(isValid)
// } catch (err) {
//     // Error possibly thrown by the thirty-two package
//     // 'Invalid input - it is not base32 encoded string'
//     console.error(err);
// }

// Function to generate OTP 
// function generateOTP() { 
          
//     // Declare a digits variable  
//     // which stores all digits 
//     var digits = '0123456789'; 
//     let OTP = ''; 
//     for (let i = 0; i < 4; i++ ) { 
//         OTP += digits[Math.floor(Math.random() * 10)]; 
//     } 
//     return OTP; 
// } 

// console.log(generateOTP())

// // Function to generate alphanumeric OTP 
// function generateAlphaNumericOTP() { 
          
//     // Declare a string variable  
//     // which stores all string 
//     var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
//     let OTP = ''; 
      
//     // Find the length of string 
//     var len = string.length; 
//     for (let i = 0; i < 6; i++ ) { 
//         OTP += string[Math.floor(Math.random() * len)]; 
//     } 
//     return OTP; 
// } 

// console.log(generateAlphaNumericOTP())

// const messagebird = require('messagebird')('oB4rEWgre601KywCEGFVMf7FR');

// const params = {
//   'originator': '+2349055932268',
//   'recipients': [
//     '+2349055932268'
//   ],
//     'body': 'Heelo you are welcome'
//   };

//   messagebird.messages.create(params, function (err, response) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(response);
//   });
  
// const accountSid = 'AC80b96e102503685aea63091e5a1fcd6d';
// const authToken = '81b8b105a865225d5bfb11950b4036f8';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+14694143769',
//      to: '+2349055932268'
//    })
//   .then(message => console.log(message.sid));
const { generateBvn } = require('./functions')

const info = generateBvn()
console.log(info)