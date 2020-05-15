import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft  } from 'react-icons/fi';
import './styles.css'

export default function Register(){
    return (
        <div className="register-container">
            <div className="register-content">
                <section>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro para acessar a plataforma.</p>
                </section>
                
                <form autoComplete="off">
                    <input placeholder="Nome" />
                    <input placeholder="E-mail" type="email" />
                    <input placeholder="Senha" type="password" />
                    <input placeholder="Confirmar Senha" type="password" />
                    <button className="button" type="submit">Cadastrar</button>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#000000"/>
                        Já Possuo Cadastro !
                    </Link>
                </form>
            </div>
        </div>
    );
}