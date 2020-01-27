const accountSid = 'AC80b96e102503685aea63091e5a1fcd6d';
const authToken = '81b8b105a865225d5bfb11950b4036f8';
const client = require('twilio')(accountSid, authToken);
 // Function to generate OTP 
 
  exports.generateOTP = (number) => {
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    }
    client.messages
    .create({
       body: `Your OTP code is ${OTP}.`,
       from: '+14694143769',
       to: number
     })
    .then(message => console.log(message.sid)); 
    return OTP; 
  }


  //function to generate BVN
  exports.generateBvn = () => {
    var digits = '0123456789'; 
    let bvn = ''; 
    for (let i = 0; i < 8; i++ ) { 
        bvn += digits[Math.floor(Math.random() * 10)]; 
    }
    return bvn
}
