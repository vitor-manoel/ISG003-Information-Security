import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiCheckCircle } from 'react-icons/fi';
import logoImg from "../../assets/logo.png";
import './styles.css'

export default function Token(){
    return (
        <div className="token-container">
            <div className="token-content">
                <section>
                    <h1>Validar Acesso</h1>
                    <img src={logoImg} alt="SysOrder" />
                    <p>
                        Token enviado com sucesso em :<br/>
                        (vmty******@gmail.com)<br/>
                        Para confirmar seu cadastro, valide-o abaixo.<br/>
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
                        <FiEdit size={18} color="#000000" style={{marginTop: 2, marginRight: 5}}/>
                        <u>Este não é meu e-mail !</u>
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