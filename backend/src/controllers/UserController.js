const conn = require('../database/conn');
const encrypt = require("../utils/encrypt");
const mailDelivery = require("../utils/mailDelivery");
const tokenID = require("../utils/tokenID");

module.exports = {
    async index(request, response) {
        const users = await conn('users').select('*');
    
        return response.json(users);
    },

    async create(request, response) {
        const {email, nome, senha} = request.body;

        await conn('users').insert({
            email,
            nome,
            senha: encrypt.encrypt(senha),
            temp: true
        })

        const user = "1";
        const token = tokenID();

        await conn('tokens').insert({
            user,
            hash: encrypt.encrypt(token)
        });

        console.log(token);

        const mailConfig = {
            from: "projeto.sysorder.si@gmail.com",
            to: email,
            subject: 'Chave de confirmação - SysOrder',
            text: ("Boa tarde, esta é uma mensagem automática para confirmação de cadastro." +
                   "\nCaso não tenha sido você quem fez o cadastro, favor desconsiderar este e-mail." +
                   "\n\nSegue abaixo o token para autenticação do seu cadastro :" +
                   "\n\n" + token)
        };
        
        mailDelivery().sendMail(mailConfig, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });

        return response.json({email});
    },

    async delete(request, response) {
        const { id } = request.params;

        await conn('users').where('id', id).delete();

        return response.status(204).send();
    }
}