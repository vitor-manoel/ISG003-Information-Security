const mailDelivery = require("../utils/mailDelivery");
const tokenID = require("../utils/tokenID");
const encrypt = require("../utils/encrypt");

module.exports = {
    async create(request, response){
        const { email, nome } = request.body;

        const token = tokenID();
    
        await conn('tokens').insert({
            user: '1',
            hash: encrypt.encrypt(token)
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
                "\n\nO token irá expirar em 1 (uma) hora caso não seja validado !")
        };
                
        mailDelivery().sendMail(mailConfig, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    },
}