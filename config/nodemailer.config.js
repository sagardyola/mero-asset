var nodemailer = require('nodemailer');
module.exports = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'electronicscrt@gmail.com',
        pass: 'SD5536178'
    }
});