import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import logoImg from "../../assets/logo.png";

import './styles.css';

export default function Login(){
    return(
        <div className="login-container">
            <div className="login-content">
                <div className="login-header">
                    <img src={logoImg} alt="SysOrder" />
                    <form className="login-form">
                        <input placeholder="E-mail" type="email" required/>
                        <div className="login-icons"><FiMail size={16}/></div>
                        <input placeholder="Senha" type="password" required/>
                        <div className="login-icons"><FiLock size={16}/></div>
                        <button className="button">Entrar</button>
                    </form>
                    <div className="login-icons"><FiLogIn size={18} color="#ffffff"/></div>
                    <div>
                        <Link className="back-link" to="/">
                            <u>Esqueci minha senha !</u>
                        </Link>
                    </div>
                </div>
                <div className="login-bottom">
                    <div>
                        <span>Não possui uma conta ?</span>
                        <Link className="back-link" to="/register">
                            <p>&nbsp;Cadastrar</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}