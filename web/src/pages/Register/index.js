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
    const [rSenha, setRSenha] = useState('');

    const history = useHistory();

    async function handleRegister(){

        const data = {
            nome,
            email,
            senha,
        };
        
        const hexMail = await api.post('register', data).catch(e => {
            alert(e.response.data.message);
        });

        if(hexMail){
            await api.post('sendToken', data).then(e => {
                alert("Pré cadastro realizado com sucesso !" +
                    "\nToken de confirmação enviado para o e-mail : " + data.email);
            }).catch(e => {
                alert(e.response.data.message);
            });
            history.push(`/confirmRegister/${hexMail.data.hexMail}`);
        }
    }

    function checkForm(e){
        e.preventDefault();

        if(senha !== rSenha){
            alert('A confirmação da senha está incorreta !');
        }else if(!senha.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)){
            alert("A senha não atende os requisitos mínimos de segurança !" +
                 "\nPelo menos 1 letra, 1 número e no mínimo 8 caracteres.");
        }else{
            handleRegister();
        }
    }

    function checkPass(e){
        setSenha(e.target.value);

        const inputPassElement = document.getElementById('password');

        inputPassElement.addEventListener('keyup', function(ev) {
            const input = ev.target;
            const value = ev.target.value;

            if(value === ''){
                input.classList.remove('--has-error');
                input.classList.remove('--has-checked');
            }else if(!value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)){
                input.classList.remove('--has-checked');
                input.classList.add('--has-error');
            }else {
                input.classList.remove('--has-error');
                input.classList.add('--has-checked');
            }
        });
    }

    function checkRPass(e){
        setRSenha(e.target.value);

        const inputRePassElement = document.getElementById('repeat-password');

        inputRePassElement.addEventListener('keyup', function(ev) {
            const input = ev.target;
            const value = ev.target.value;

            if(value === ''){
                input.classList.remove('--has-error');
                input.classList.remove('--has-checked');
            }else if(!value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) || value !== senha){
                input.classList.remove('--has-checked');
                input.classList.add('--has-error');
            }else {
                input.classList.remove('--has-error');
                input.classList.add('--has-checked');
            }
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
                
                <form onSubmit={checkForm} autoComplete="off">
                    <input placeholder="Nome" 
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required/>
                    <input placeholder="E-mail" type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required/>
                    <input placeholder="Senha" type="password"
                        className="password-input-check"
                        id="password"
                        value={senha}
                        onChange={e => checkPass(e)}
                        required/>
                    <input placeholder="Confirmar Senha" type="password"
                        className="password-input-check"
                        id="repeat-password"
                        value={rSenha}
                        onChange={e => checkRPass(e)}
                        required/>
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