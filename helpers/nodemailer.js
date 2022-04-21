"use strict"
const nodemailer = require("nodemailer")

function sendEmail(email, userName){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'senikaryahacktive7@gmail.com',
            pass: 'senikarya123'
        }
    });
    
    var mailOptions = {
        from: 'senikaryahacktive7@gmail.com',
        to: `${email}`,
        subject: 'Registrasi Akun Karya Seni',
        text: `halo ${userName}, akun kamu sekarang sudah terdaftar di Karya seni`
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });
}

module.exports = sendEmail;