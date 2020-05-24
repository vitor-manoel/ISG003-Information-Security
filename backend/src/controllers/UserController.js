const conn = require('../database/conn');
const encrypt = require("../utils/encrypt");

module.exports = {
    async index(request, response) {
        const users = await conn('users').select('*');
    
        return response.json(users);
    },

    async create(request, response) {
        const {email, nome, senha} = request.body;
        let message = '';

        await conn('users').insert({
            email,
            nome,
            senha: encrypt.encrypt(senha),
            temp: true
        }).then(() => {
            return response.json({email});
        }).catch(e => {
            if(e.errno === 19){
                message = 'Este e-mail já está em uso !';
            }
            return response.status(405).send({
                message,
            });
        });
    },

    async delete(request, response) {
        const { id } = request.params;

        await conn('users').where('id', id).delete();

        return response.status(204).send();
    }
}