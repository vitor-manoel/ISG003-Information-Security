import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './styles.css'

export default function RecoveryModal(){
    return (
        <div className="recovery-container">
            <div className="recovery-content">
                <form>
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