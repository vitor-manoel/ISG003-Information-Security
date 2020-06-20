import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal} from 'react-bootstrap';
import { FiMail, FiLock, FiLogIn, FiKey } from 'react-icons/fi'
import logoImg from "../../assets/logo.png";
import RecoveryModal from '../RecoveryPass';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import api from '../../services/api';

export default function Login(){

    const history = useHistory();

    const [showRec, setShowRec] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleOpenRec = () => setShowRec(true);
    const handleCloseRec = () => setShowRec(false);

    async function handleLogin(e){
        e.preventDefault();

        const data = {
            email: email,
            senha: senha
        }

        await api.post('sessions', data).then(e => {
            localStorage.setItem('userMail', email);
            history.push('/home');
        }).catch(e => {
            alert(e.response.data.error);
            if(e.response.data.changeURL){
                history.push(`/confirmRegister/${e.response.data.user.email}`);
            }
        });
    }

    return(
        <div className="login-container">
            <div className="login-content">
                <div className="login-header">
                    <img src={logoImg} alt="SysOrder" />
                    <form className="login-form" onSubmit={handleLogin}>
                        <input placeholder="E-mail" 
                        type="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required/>
                        <div className="login-icons"><FiMail size={16}/></div>
                        <input placeholder="Senha" 
                        type="password"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        required/>
                        <div className="login-icons"><FiLock size={16}/></div>
                        <button className="button">Entrar</button>
                    </form>
                    <div className="login-icons"><FiLogIn size={18} color="#ffffff"/></div>
                    <div>
                        <Link className="back-link" onClick={handleOpenRec}>
                            <FiKey size={16} color="#000000" style={{marginRight: 5}}/>
                            <u>Esqueci minha senha !</u>
                        </Link>
                    </div>
                </div>
                <div className="login-bottom">
                    <div>
                        <span>Não possui uma conta ?&nbsp;</span>
                        <Link className="back-link" to="/register">
                            Cadastrar
                        </Link>
                    </div>
                </div>
                <Modal show={showRec} 
                onHide={handleCloseRec}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    <RecoveryModal/>
                </Modal>
            </div>
        </div>
    );
}