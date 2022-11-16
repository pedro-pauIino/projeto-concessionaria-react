import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Main from "../template/Main";
import Cards from "../template/Card";
import "./CrudVeiculos.css";

export default function Carometro() {


    const title = "Cadastro de veiculos";
    const [cursos, setCursos] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [inputCurso, setInputCurso] = useState([]);

    const urlCurso = "http://localhost:5212/api/curso";
    const urlAluno = "http://localhost:5212/api/aluno";
    const urlImg =   "https://i.pravatar.cc/152?img=";

    useEffect(() => {
        axios(urlAluno).then((reponse) => {
            setAlunos(
                reponse.data.map((aluno) => ({
                    id: aluno.id,
                    ra: aluno.ra,
                    nome: aluno.nome,
                    codCurso: aluno.codCurso,
                }))
            );
        });
    }, []);

    useEffect(() => {
        axios(urlCurso).then((reponse) => {
            setCursos(
                reponse.data.map((curso) => ({
                    id: curso.id,
                    codCurso: curso.codCurso,
                    nomeCurso: curso.nomeCurso,
                    periodo: curso.periodo,
                }))
            );
        });
    }, []);

    const atualizaCurso = (codCurso) => {
        const curso = cursos.find((curso) => String(curso.codCurso) === codCurso);

        setInputCurso(curso);
    };

    const selecionaAlunos = (alunos) => {
        if (inputCurso) {
            return alunos.filter((aluno) => aluno.codCurso === inputCurso.codCurso);
        }

        return alunos;
    };

    return (
        <Main title={title}>
            <div>
                <div>
                    <select
                        className="select"
                        onChange={(event) => atualizaCurso(event.target.value)}
                        value={
                            inputCurso
                                ? cursos.find(
                                    (curso) => curso.nomeCurso === inputCurso.nomeCurso
                                )?.codCurso : ""
                        }
                    >
                        <option value="">
                            Todos
                        </option>
                        {cursos.map((curso) => (
                            <option value={curso.codCurso} key={curso.codCurso}>
                                {curso.nomeCurso}
                            </option>
                        ))}
                    </select>
                </div>
                {selecionaAlunos(alunos).map((aluno) => (
                    <Cards
                        codCurso={aluno.codCurso}
                        nome={aluno.nome}
                        ra={aluno.ra}
                        key={aluno.ra}
                        img={`${urlImg}${aluno.id}.jpg`}
                    />
                ))}
            </div>
            
        </Main>
        
    );
}