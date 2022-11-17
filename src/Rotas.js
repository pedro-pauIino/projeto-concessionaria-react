import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/template/Main';
import Showroom from './components/Showroom/Showroom'
import CrudConcessionaria from './components/CrudConcessionaria/CrudConcessionaria'
import CrudVeiculos from './components/CrudVeiculos/CrudVeiculos'
import AuthService from './services/AuthService';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';

export default function Rotas() {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Routes>
            <Route exact path='/'
                element={
                    <Main title="Bem Vindo!">
                        <div>Projeto Final DS402 NOT - COTUCA
                        <br></br>
                        <br></br>
                            Danny Souza - 20665 | Pedro Paulino - 20693
                        </div>
                    </Main>}
            />
            <Route exact path='/showroom'
                element={<Showroom />}
            />
            {currentUser ? (
                <Route exact path='/cadastroConcessionaria'
                    element={
                        <CrudConcessionaria />
                    }
                />
            ) : (
                <Route exact path='/cadastroConcessionaria'
                    element={
                        <Main title="Cadastro de Concessionarias">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}
            {currentUser ? (
                <Route exact path='/cadastroVeiculos'
                    element={
                        <CrudVeiculos />
                    }
                />
            ) : (
                <Route exact path='/cadastroVeiculos'
                    element={
                        <Main title="Cadastro de Veículos">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path="*" to='/' />
        </Routes>
    )
}
