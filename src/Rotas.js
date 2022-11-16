import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/template/Main';
import CrudAluno from './components/CrudAluno/CrudAluno';
import CrudCurso from './components/CrudCurso/CrudCurso';
import Carometro from './components/Carometro/Carometro';
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
                        <div>Projet</div>
                    </Main>}
            />
            {currentUser ? (
                <Route exact path='/alunos'
                    element={<CrudAluno />}
                />
            ) : (
                <Route exact path='/alunos'
                    element={
                        <Main title="Aluno">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}
            {currentUser ? (
                <Route exact path='/carometro'
                    element={
                        <Carometro />
                    }
                />
            ) : (
                <Route exact path='/carometro'
                    element={
                        <Main title="Carometro">
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
