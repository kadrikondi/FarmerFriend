const accountSid = 'AC125e4e6e6df47686794bf643c148ad90';
const authToken = '2923597349e51ae470e952507378dc6a';
const client = require('twilio')(accountSid, authToken);
// Function to generate OTP 

exports.generateOTP = (number) => {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  client.messages
    .create({
      body: `Your OTP code is ${OTP}.`,
      from: '+12017205895',
      to: number
    })
    .then(message => console.log(message.sid));
  return OTP;
}


//function to generate BVN
exports.generateBvn = () => {
  var digits = '0123456789';
  let bvn = '';
  for (let i = 0; i < 8; i++) {
    bvn += digits[Math.floor(Math.random() * 10)];
  }
  return bvn
}