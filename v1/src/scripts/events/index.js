const eventEmitter = require("./eventEmitter")
const nodemailer = require("nodemailer");


module.exports = () => {
    eventEmitter.on("send_email", async (emailData) => {

        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.PORT,
            auth: {
              user: 'hiveproject67@gmail.com',
              pass:'rdjmckfdkscyklcy'
            },
          });

          let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            ...emailData // sender address
          });
    });
};