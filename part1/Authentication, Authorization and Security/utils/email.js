const nodemailer = require('nodemailer')

const sendEmail = async options=>{
    //1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
        // Activate in gmail 'less secure app' options

    })

    //2) Define the email options
    const mailOptions = {
        from: 'robera insarmu <users@gmail.com',
        to: "user1@example.com",
        to: options.subject,

        text: options.message
        //html

    }

    //3) Actually send the email
     transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
}

module.exports = sendEmail