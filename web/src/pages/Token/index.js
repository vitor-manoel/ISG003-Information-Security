import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiCheckCircle, FiMail } from 'react-icons/fi';
import logoImg from "../../assets/logo.png";
import './styles.css'

import api from '../../services/api';

export default function Token(props){

    const hexMail = props.match.params.mail;
    const [email, setEmail] = useState(hexMail);

    useEffect(() => {
        api.get(`userMail/${hexMail}`).then(response => {
            const mail = response.data;
            const toSens = mail.substring(3, mail.indexOf("@"));
            const censMail = mail.replace(toSens , toSens.replace(/./g, "*"));
            setEmail(censMail);
        })
        
    }, [hexMail]);

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
                
                <form autoComplete="off">
                    <input placeholder="Código" required/>
                    <button className="button" type="submit">
                        <FiCheckCircle size={18} color="#ffffff" style={{marginBottom: 4,marginRight: 10}}/>
                        Validar
                    </button>
                    <Link className="mailEdit-link">
                        <FiEdit size={18} color="#000000" style={{marginTop: 3, marginRight: 5}}/>
                        <u>Este não é meu e-mail !</u>
                    </Link>
                    <Link className="mailEdit-link" style={{marginTop: -16}}>
                        <FiMail size={18} color="#000000" style={{marginTop: 4, marginRight: 5}}/>
                        <u>Reenviar Token (3) !</u>
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