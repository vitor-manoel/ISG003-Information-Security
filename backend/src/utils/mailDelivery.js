const nodemailer = require('nodemailer');

const u = "";
const p = "";

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