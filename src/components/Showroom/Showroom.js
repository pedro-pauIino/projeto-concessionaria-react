import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Main from "../template/Main";
import Cards from "../template/Card";
import "./Showroom.css";

export default function Carometro() {


    const title = "Showroom de veiculos";
    const [concessionarias, setConcessionarias] = useState([]);         
    const [veiculos, setVeiculos] = useState([]);                   
    const [inputConcessionarias, setInputConcessionarias] = useState([]);

    const urlConcessionaria = "http://localhost:5212/api/concessionaria";
    const urlVeiculo = "http://localhost:5212/api/veiculo";
    const urlImg = "https://picsum.photos/400/200?random";

    useEffect(() => {
        axios(urlVeiculo).then((reponse) => {
            setVeiculos(
                reponse.data.map((veiculo) => ({
                    id: veiculo.id,
                    placa: veiculo.placa,
                    marca: veiculo.marca,
                    modelo: veiculo.modelo,
                    ano: veiculo.ano,
                    cor: veiculo.cor,
                    preco: veiculo.preco,
                    codloja: veiculo.codloja,

                }))
            );
        });
    }, []);

    useEffect(() => {
        axios(urlConcessionaria).then((reponse) => {
            setConcessionarias(
                reponse.data.map((concessionaria) => ({
                    id: concessionaria.id,
                    codLoja: concessionaria.codLoja,
                    nomeLoja: concessionaria.nomeLoja,
                    cep: concessionaria.cep,
                    endereco: concessionaria.endereco,
                    estado: concessionaria.estado,
                }))
            );
        });
    }, []);

    const atualizaConcessionaria = (codLoja) => {
        const concessionaria = concessionarias.find((concessionaria) => String(concessionaria.codLoja) === codLoja);

        setInputConcessionarias(concessionaria);
    };

    const selecionaVeiculos = (veiculos) => {
        if (inputConcessionarias) {
            return veiculos.filter((veiculo) => veiculo.codLoja === inputConcessionarias.codLoja);
        }

        return veiculos;
    };

    return (
        <Main title={title}>
            <div>
                <div>
                    <select
                        className="select"
                        onChange={(event) => atualizaConcessionaria(event.target.value)}
                        value={
                            inputConcessionarias
                                ? concessionarias.find(
                                    (concessionaria) => concessionaria.nomeLoja === inputConcessionarias.nomeLoja
                                )?.codLoja : ""
                        }
                    >
                        <option value="">
                            Todos
                        </option>
                        {concessionarias.map((concessionaria) => (
                            <option value={concessionaria.codLoja} key={concessionaria.codLoja}>
                                {concessionaria.nomeLoja}
                            </option>
                        ))}
                    </select>
                </div>
                {selecionaVeiculos(veiculos).map((veiculo) => (
                    <Cards
                        codLoja={veiculo.codLoja}
                        placa={veiculo.placa}
                        marca={veiculo.marca}
                        modelo={veiculo.modelo}
                        ano={veiculo.ano}
                        cor={veiculo.cor}
                        km={veiculo.km}
                        preco={veiculo.preco}
                        img={`${urlImg}${veiculo.id}.jpg`}
                    />
                ))}
            </div>
            
        </Main>
        
    );
}