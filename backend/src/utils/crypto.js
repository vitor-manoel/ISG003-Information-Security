const DATA = {
    algoritmo: "aes128",
    segredo: "s1s0rd3r",
    tipo: "hex"
}
const crypto = require('crypto');

function criptografar(text){
    const cipher = crypto.createCipher(DATA.algoritmo,DATA.segredo);
    const encrypted = cipher.update(text, 'utf8', DATA.tipo);
    return (encrypted + cipher.final(DATA.tipo));
}

async function descriptografar(text){
    const decipher = crypto.createDecipher(DATA.algoritmo,DATA.segredo);
    decipher.setAutoPadding(false);
    const decrypted = decipher.update(text, DATA.tipo, 'utf8');
    return (decrypted + decipher.final('utf8'));
}

module.exports = {criptografar, descriptografar};