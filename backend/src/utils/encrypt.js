const crypto = require('bcryptjs');

function encrypt(text){
    const salt = crypto.genSaltSync(10);
    const hash = crypto.hashSync(text, salt);
    return hash;
}

function compare(text, hash){
    return crypto.compareSync(text, hash);
}

module.exports = {encrypt, compare};