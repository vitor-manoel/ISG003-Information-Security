import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft  } from 'react-icons/fi';
import logoImg from "../../assets/logo.png";
import './styles.css'

import api from '../../services/api';

export default function Register(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            nome,
            email,
            senha
        };

        await api.post('register', data).then(resp => {
            alert("Pré cadastro realizado com sucesso !" +
                "\nConfirme sua conta no e-mail : " + resp.data.email);
            history.push('/confirmRegister');
        }).catch(e => {
            alert(e.response.data.message);
        });
    }

    return (
        <div className="register-container">
            <div className="register-content">
                <section>
                    <h1>Cadastro</h1>
                    <img src={logoImg} alt="SysOrder" />
                    <p>Faça seu cadastro para acessar a plataforma.</p>
                </section>
                
                <form onSubmit={handleRegister} autoComplete="off">
                    <input placeholder="Nome" 
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required/>
                    <input placeholder="E-mail" type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required/>
                    <input placeholder="Senha" type="password"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required/>
                    <input placeholder="Confirmar Senha" type="password" required/>
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