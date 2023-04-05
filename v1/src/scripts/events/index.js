//const eventEmitter = require("./eventEmitter")
const eventEmitter = require('./eventEmitter');

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.PORT,
  service: 'gmail',
  auth: {
    user: 'hiveproject67@gmail.com',
    pass: 'wtlmxxmmjqpqqzyl'
  }
});

const sendMail = async (emailData) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      ...emailData
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.log(error);
  }
};

eventEmitter.on('send_email', sendMail);

module.exports = eventEmitter;

//  module.exports = () => {
//      eventEmitter.on("send_email", async (emailData) => {

//          let transporter = nodemailer.createTransport({
//              host: process.env.EMAIL_HOST,
//              port: process.env.PORT,
//              service: 'gmail',
//              auth: {
//                user: 'hiveproject67@gmail.com',
//                pass:'wtlmxxmmjqpqqzyl'
//              },
//            });

//            let info = await transporter.sendMail({
//             from: process.env.EMAIL_FROM,
//              ...emailData // sender address
//            });
//      });
// };


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'hiveproject67@gmail.com', // Gönderici e-posta adresi
//     pass: 'wtlmxxmmjqpqqzyl' // Gönderici e-posta şifresi
//   }
// });

// const mailOptions = {
//   from: 'hiveproject67@gmail.com', // Gönderici e-posta adresi
//   to: 'erayogeterr@gmail.com', // Alıcı e-posta adresi
//   subject: 'Test Email',
//   text: 'This is a test email sent using Node.js and Nodemailer.'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });