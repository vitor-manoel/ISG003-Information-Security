import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiCheckCircle, FiMail } from 'react-icons/fi';
import logoImg from "../../assets/logo.png";
import './styles.css'

import api from '../../services/api';

export default function Token(props){

    const history = useHistory();

    const hexMail = props.match.params.mail;

    const [email, setEmail] = useState(hexMail);
    const [token, setToken] = useState('');
    const [attemps, setAttemps] = useState('');

    useEffect(() => {
        async function desMail() {
            await api.get(`userMail/${hexMail}`).then(response => {
                let mail = response.data.descMail;
                let toSens = mail.substring(0, mail.indexOf("@"));
                if(toSens.length >= 4){
                    toSens = mail.substring(3, mail.indexOf("@"));
                    mail = mail.replace(toSens , toSens.replace(/./g, "*"));
                }
                setEmail(mail);
                setAttemps(response.data.attemps);
            });
        }
        desMail();
    }, [hexMail]);

    async function checkToken(e){
        e.preventDefault();

        const data = {
            hexMail: hexMail,
            token: token
        }

        await api.post('checkToken', data).then(e => {
            alert('Cadastro confirmado !');

            history.push("");
        }).catch(e => {
            if(e.response.data.changeURL){
                alert(e.response.data.message);
                history.push("");
            }else {
                alert(e.response.data.message);
                setAttemps(e.response.data.attemps);
            }
        });
    }

    return (
        <div className="token-container">
            <div className="token-content">
                <section>
                    <h1>Validar Acesso</h1>
                    <img src={logoImg} alt="SysOrder" />
                    <p>
                        ({email})<br/>
                        Para confirmar seu cadastro, insira o token recebido em seu e-mail.<br/>
                        Lembre-se de verificar o spam.
                    </p>
                </section>
                
                <form autoComplete="off" onSubmit={checkToken}>
                    <input placeholder="Código" 
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    required/>
                    <button className="button" type="submit">
                        <FiCheckCircle size={18} color="#ffffff" style={{marginBottom: 4,marginRight: 10}}/>
                        Validar
                    </button>
                    <Link className="mailEdit-link">
                        <FiEdit size={18} color="#000000" style={{marginTop: 3, marginRight: 5}}/>
                        <u>Este não é meu e-mail (1) !</u>
                    </Link>
                    <Link className="mailEdit-link" style={{marginTop: -16}}>
                        <FiMail size={18} color="#000000" style={{marginTop: 4, marginRight: 5}}/>
                        <u>Reenviar Token ({attemps}) !</u>
                    </Link>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#000000" style={{marginRight: 5}}/>
                        Voltar
                    </Link>
                </form>
            </div>
        </div>
    );
}