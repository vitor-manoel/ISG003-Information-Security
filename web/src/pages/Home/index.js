import React from 'react';
import { FiLogOut } from 'react-icons/fi'

import './styles.css';

export default function Home(){
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