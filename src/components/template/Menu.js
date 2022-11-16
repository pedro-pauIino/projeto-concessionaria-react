import './Menu.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService'

export default function Menu(props) {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <nav>
            <a><Link to="/Showroom" className='logo'> LOGO </Link></a>
            
            <ul className='nav-list'>
                <li><a><Link to="/showroom" className='pagina'>Showroom</Link></a></li>
                <li><a><Link to="/cadastro" className='pagina'>Cadastro de Veiculos</Link></a></li>

                {currentUser ? (
                    <li><a><Link to="logout" className='pagina' id='logout'>Logout</Link></a></li>
                ) : (
                    <li><a><Link to="login" className='pagina' id='login'>Login</Link></a></li>
                )}
            </ul>
        </nav>
    )
}   