const nodemailer = require('nodemailer');
const config = require('./config')

var MailService = function(data, callback){
    let transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        //service: "Gmail",
        secure: false, 
        auth: {
            user: config.user,
            pass: config.password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        },
        authMethod: 'PLAIN'
    });
    let mailOptions = {
        from: '"'+config.sender+'" <'+config.email+'>', 
        to: data.to, 
        subject: data.subject,
        text: data.text, 
        html: '<b>Hello User</b>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            callback(error);
        }else{
            callback(null, mailOptions);
        }
    });

}

module.exports = MailService;
