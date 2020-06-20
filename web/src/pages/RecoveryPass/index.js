import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import './styles.css'

import api from '../../services/api';

export default function RecoveryModal(){

    const [email, setEmail] = useState([]);

    async function recoveryPass(e) {
        e.preventDefault();

        try{
            await api.post('recoveryPassword', {email: email});
            alert(`E-mail de recuperação enviado para : ${email}`)
        }catch(e){
            alert(e.response.data.message);
        }
    }

    return (
        <div className="recovery-container">
            <div className="recovery-content">
                <form onSubmit={recoveryPass}>
                    <Modal.Header closeButton>
                        <Modal.Title>Recuperar Senha</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>Insira seu e-mail para recuperação :</span>
                        <input 
                        style={{marginTop: 20}} 
                        placeholder="E-mail" 
                        autocomplete="off" 
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required>
                        </input>
                    </Modal.Body>
                    <Modal.Footer style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Button type="submit">
                            Enviar
                        </Button>
                    </Modal.Footer>
                </form>
            </div>
        </div>
    );
}