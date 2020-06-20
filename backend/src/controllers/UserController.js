const conn = require('../database/conn');
const mailDelivery = require("../utils/mailDelivery");
const encrypt = require("../utils/encrypt");
const crypts = require('crypto');
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
        const descMail = crypto.descriptografar(hexMail);

        const user = await conn('users').where('email', hexMail).select('id').first();

        const token = await conn('tokens').where('user', user.id).select('attemps').first();

        const data = {
            descMail: descMail,
            attemps: token.attemps
        }

        return response.json(data);
    },

    async delete(request, response) {
        const { id } = request.params; 

        await conn('users').where('id', id).delete();

        return response.status(204).send();
    },

    async recoveryPass(request, response){
        const {email} = request.body;

        const hexMail = crypto.criptografar(email);

        const user = await conn('users').where('email', hexMail).select('*').first();

        if(!user){
            return response.status(405).send({
                message: 'Este e-mail não possui cadastro !',
            });
        }else if(user.temp === 1){
            return response.status(405).send({
                message: 'E-mail não confirmado !',
            });
        }

        const randomPass = crypts.randomBytes(4).toString('HEX');

        await conn('users').where('email', hexMail).update('recoveryPass', encrypt.encrypt(randomPass));

        const mailConfig = {
            from: "projeto.sysorder.si@gmail.com",
            to: email,
            subject: 'Recuperação de Senha - SysOrder',
            text: ("Olá, " + user.nome + " !" +
                "\n\nEsta é uma mensagem automática para recuperação de senha." +
                "\nCaso não tenha sido você quem solicitou, desconsidere este e-mail." +
                "\nA senha gerada, terá validade de 1 (uma) hora antes de expirar." +
                "\nAo logar com está senha, você precisará redefinir uma nova senha de acesso !" +
                "\n\nSenha Provisória : " + randomPass)
        };
                
        mailDelivery().sendMail(mailConfig, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });

        return response.json(user);
    }
}