const conn = require('../database/conn');
const encrypt = require("../utils/encrypt");
const crypto = require('../utils/crypto');

module.exports = {
    async index(request, response) {
        const users = await conn('users').select('*');
    
        return response.json(users);
    },

    async create(request, response) {
        const {email, nome, senha} = request.body;
        const hexMail = crypto.criptografar(email);

        let message = '';

        await conn('users').insert({
            email: hexMail,
            nome,
            senha: encrypt.encrypt(senha),
            temp: true
        }).then(() => {
            return response.json({hexMail});
        }).catch(e => {
            if(e.errno === 19){
                message = 'Este e-mail já está em uso !';
            }
            return response.status(405).send({
                message,
            });
        });


    },

    async userMail(request, response) {
        const { hexMail } = request.params;
        const descMail = await crypto.descriptografar(hexMail);

        const tokenID = await conn('users').select('*').where('email', hexMail);

        console.log(tokenID);

        return response.json(descMail);
    },

    async delete(request, response) {
        const { id } = request.params; 

        await conn('users').where('id', id).delete();

        return response.status(204).send();
    },
}