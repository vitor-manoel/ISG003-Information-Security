const nodemailer = require('nodemailer');

const u = "projeto.sysorder.si@gmail.com";
const p = "sysorder";

module.exports = function mailDelivery() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: u,
            pass: p
        }
    });

    return(transporter);
}