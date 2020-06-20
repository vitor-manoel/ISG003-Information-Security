import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'

import './styles.css';

export default function Home(){
    const history = useHistory();

    const session = localStorage.getItem('userMail');

    if(!session){
        history.push("");
    }

    useEffect(() => {
        
    });

    return(
        <div className="home-container">
            <div className="home-content">
                <span>Olá, Vitor Manoel !</span>
                <FiLogOut size={16}/>
                <p>Sair</p>
            </div>
        </div>
    );
}