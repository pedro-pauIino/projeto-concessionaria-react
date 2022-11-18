import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Main from "../template/Main";
import Cards from "../template/Card";
import "./Showroom.css";

export default function Showroom() {


    const title = "Showroom";
    const [veiculo, setVeiculo] = useState([]);
    const [concessionaria, setConcessionaria] = useState([]);
    const [inputConcessionaria, setInputConcessionaria] = useState([]);

    const urlConcessionaria = "http://localhost:5212/api/concessionaria";
    const urlVeiculo = "http://localhost:5212/api/veiculo";

    useEffect(() => {
        axios(urlVeiculo).then((reponse) => {
            setVeiculo(
                reponse.data.map((veiculo) => ({
                    id: veiculo.id,
                    modelo: veiculo.modelo,
                    codLoja: veiculo.codLoja,
                    marca:veiculo.marca,
                    valor:veiculo.valor,
                    ano: veiculo.ano,
                    cor: veiculo.cor,
                    km: veiculo.km,
                    placa:veiculo.placa,
                    preco: veiculo.preco
                }))
            );
        });
    }, []);

    useEffect(() => {
        axios(urlConcessionaria).then((reponse) => {
            setConcessionaria(
                reponse.data.map((concessionaria) => ({
                    id: concessionaria.id,
                    codLoja:concessionaria.codLoja,
                    nomeLoja:concessionaria.nomeLoja              
                }))
            );
        });
    }, []);

    const atualizaConcessionaria = (codLoja) => {
        const concessionaria = concessionaria.find((concessionaria) => String(concessionaria.codLoja) === codLoja);

        setInputConcessionaria(concessionaria);
    };

    const selecionaVeiculo = (veiculo) => {
        if (inputConcessionaria) {
            return veiculo.filter((veiculo) => veiculo.codLoja === inputConcessionaria.codLoja);
        }

        return veiculo;
    };

    return (
        <Main title={title}>
            <div>
                <div>
                    <select
                        className="select"
                        onChange={(event) => atualizaConcessionaria(event.target.value)}
                        value={
                            inputConcessionaria
                                ? concessionaria.find(
                                    (concessionaria) => concessionaria.nomeLoja === inputConcessionaria.nomeLoja
                                )?.codLoja : ""
                        }
                    >
                        <option value="">
                            Todos
                        </option>
                        {concessionaria.map((concessionaria) => (
                            <option value={concessionaria.codLoja} key={concessionaria.codLoja}>
                                {concessionaria.codLoja} - {concessionaria.nomeLoja}
                            </option>
                        ))}
                    </select>
                    <p></p> {/* Coloquei essa tag p para separar o card do botão de selecionar*/}
                </div>
                {selecionaVeiculo(veiculo).map((veiculo) => (
                    <Cards
                        marca={veiculo.marca}
                        modelo={veiculo.modelo}
                        ano={veiculo.ano}
                        valor={veiculo.valor}
                        key={concessionaria.id}
                        img={`${veiculo.id}.jpg`}
                    />
                ))}
            </div>
            
        </Main>
        
    );
}