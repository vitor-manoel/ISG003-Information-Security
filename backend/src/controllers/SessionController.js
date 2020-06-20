const conn = require('../database/conn');
const encrypt = require("../utils/encrypt");
const crypto = require("../utils/crypto");

module.exports = {
    async create(request, response){
        const { email, senha } = request.body;

        const user = await conn('users')
        .where('email', crypto.criptografar(email))
        .select('*')
        .first();

        if(!user){
            return response.status(405).send({error: 'E-mail não cadastrado.'});
        }else{
            if(!encrypt.compare(senha, user.senha) || (user.recoveryPass !== null && !encrypt.compare(senha, user.recoveryPass))){
                return response.status(405).send({error: 'Login ou senha incorretos !'});
            }else if(user.temp === 1){
                return response.status(405).send({error: 'Confirme seu e-mail.', changeURL: true, user: user});
            }
        }

        return response.json(user);
    }
}