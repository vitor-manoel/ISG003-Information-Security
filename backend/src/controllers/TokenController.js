const conn = require('../database/conn');
const mailDelivery = require("../utils/mailDelivery");
const tokenID = require("../utils/tokenID");
const encrypt = require("../utils/encrypt");
const crypto = require('../utils/crypto');

module.exports = {
    async create(request, response){
        const { email, nome } = request.body;

        const token = tokenID();

        const hashToken = encrypt.encrypt(token);
        
        const user = await conn('users').where('email', crypto.criptografar(email)).select('id').first();
    
        await conn('tokens').insert({
            user: user.id,
            hash: hashToken,
            attemps: 3
        });
    
        const mailConfig = {
            from: "projeto.sysorder.si@gmail.com",
            to: email,
            subject: 'Token de confirmação - SysOrder',
            text: ("Olá, " + nome + " !" +
                "\n\nEsta é uma mensagem automática para confirmação de cadastro." +
                "\nCaso não tenha sido você quem fez o cadastro, favor desconsiderar este e-mail." +
                "\n\nSegue abaixo o token para autenticação do seu cadastro :" +
                "\n\n" + token +
                "\n\nOu ative pelo link : " + `http://localhost:3000/${crypto.criptografar(email)}/${hashToken}` +
                "\n\nO token irá expirar em 1 (uma) hora ou após 3 (três) tentativas incorretas !")
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

    async checkToken(request, response){
        const {token, hexMail} = request.body;

        const user = await conn('users').where('email', hexMail).select('id').first();
        
        const tokenList = await conn('tokens').where('user', user.id).select('*').first();

        if(encrypt.compare(token, tokenList.hash)){
            await conn('users').where('email', hexMail).update('temp', 0);
            await conn('tokens').where('user', user.id).del();
            return response.json({hexMail});
        }else {
            const tokenAttemps = (tokenList.attemps - 1);
            if(tokenAttemps <= 0) {
                await conn('users').where('email', hexMail).del();
                await conn('tokens').where('user', user.id).del();
                return response.status(405).send({
                    message: 'Tentativas esgotadas ! Cadastro cancelado.',
                    changeURL: true
                });
            }else {
                await conn('tokens').where('user', user.id).update('attemps', tokenAttemps);
                return response.status(405).send({
                    message: `Token inválido ! ${tokenAttemps} tentativas restantes.`,
                    attemps: tokenAttemps
                });
            }
        }
    },

    async tokenAttemps(request, response){
        const { hexMail } = request.params;

        const user = await conn('user').where('email', hexMail).select('id').first();

        const tokenAttemps = await conn('tokens').where('user', user.id).select('attemps').first();

        return response.json({tokenAttemps});
    }
}