const nodemailer = require('nodemailer')

const sendEmail = async options=>{
    //1) Create a transporter
    console.log(process.env.EMAIL_HOST,process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD)
    const transporter = nodemailer.createTransport({
        service:'gmail',
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
        to: "abelkinfu678@gmail.com",
        subject: options.subject,

        text: options.message
        //html

    }
    console.log(mailOptions)

    //3) Actually send the email
    await transporter.sendMail(mailOptions)
    
}

module.exports = sendEmail