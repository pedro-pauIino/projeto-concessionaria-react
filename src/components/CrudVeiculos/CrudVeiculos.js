import { BsTrash } from 'react-icons/bs';
import { BiSave } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';
import { MdModeEdit } from 'react-icons/md';

import React, { useEffect, useState, Component } from 'react';
import axios from 'axios';
import Main from "../template/Main";
import "../CrudVeiculos/CrudVeiculos.css";

const title = "Cadastro de Veiculos";
const urlAPI = "http://localhost:5212/api/veiculo";
const urlConcessionaria = "http://localhost:5212/api/concessionaria"
const initialState = {
    veiculo: { id: 0, chassi: 0, marca: '', modelo: '', ano: 0,cor:'', preco:0, codLoja:0},   
    lista: [],
    listaLoja: []
}

export default class CrudVeiculos extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
            console.log(resp.data)
        })
        axios(urlConcessionaria).then(resp => {
            this.setState({ listaLoja: resp.data })
            console.log(resp.data)
        })

    }

    limpar() {
        this.setState({ veiculo: initialState.veiculo });
    }
    salvar() {
        const veiculo = this.state.veiculo;
        veiculo.chassi = Number(veiculo.chassi);
        const metodo = veiculo.id ? 'put' : 'post';
        const url = veiculo.id ? `${urlAPI}/${veiculo.id}` : urlAPI;

        axios[metodo](url, veiculo)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ veiculo: initialState.veiculo, lista })
            })
    }
    getListaAtualizada(veiculo, add = true, remove = false) {
        const lista = this.state.lista.filter(a => a.id !== veiculo.id);
        if (add) lista.unshift(veiculo);
        if (remove) lista.splice(veiculo);
        return lista;
    }
    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const veiculo = { ...this.state.veiculo };
        //usar o atributo NAME do input identificar o campo a ser atualizado
        veiculo[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ veiculo });
    }

    carregar(veiculo) {
        this.setState({ veiculo })
    }
    remover(veiculo) {
        const url = urlAPI + "/" + veiculo.id;
        if (window.confirm("Confirma remoção do veiculo: " + veiculo.modelo)) {
            console.log("entrou no confirm");
            axios['delete'](url, veiculo)
                .then(resp => {
                    const lista = this.getListaAtualizada(veiculo, false)
                    this.setState({ veiculo: initialState.veiculo, lista })
                })
        }
    }

    renderForm() {
        return (
            <div className="inclui-container">
                <label> Chassi Veiculo: </label>
                <input
                    type="number"
                    id="chassi"
                    placeholder="Chassi"
                    className="form-input"
                    name="chassi"

                    value={this.state.veiculo.chassi}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Marca: </label>
                <input
                    type="text"
                    id="marca"
                    placeholder="Marca"
                    className="form-input"
                    name="marca"

                    value={this.state.veiculo.marca}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Modelo: </label>
                <input
                    type="text"
                    id="modelo"
                    placeholder="Modelo"
                    className="form-input"
                    name="modelo"

                    value={this.state.veiculo.modelo}
                    
                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Ano: </label>
                <input
                    type="number"
                    id="ano"
                    placeholder="Ano"
                    className="form-input"
                    name="ano"

                    value={this.state.veiculo.ano}
                    
                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Cor: </label>
                <input
                    type="text"
                    id="cor"
                    placeholder="Cor"
                    className="form-input"
                    name="cor"

                    value={this.state.veiculo.cor}
                    
                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Preço: </label>
                <input
                    type="number"
                    id="preco"
                    placeholder="Preço"
                    className="form-input"
                    name="preco"

                    value={this.state.veiculo.preco}
                    
                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Codigo da Loja: </label>
                <select
                    id="codLoja"
                    placeholder="Código Loja"
                    className="form-input"
                    name="codLoja"
                    value={this.state.veiculo.codLoja}
                    onChange={e => this.atualizaCampo(e)}

                    >
                        <option value='0'> Selecione a Loja </option>
                        {this.state.listaLoja.map(concessionaria => (<option key={concessionaria.codLoja} value={concessionaria.codLoja}> {concessionaria.codLoja} - {concessionaria.nomeLoja}</option>))}
                    </select>
                
                <button className="btnSalvar"
                    onClick={e => this.salvar(e)} >
                    Salvar
                </button>
                <button className="btnCancelar"
                    onClick={e => this.limpar(e)} >
                    Cancelar
                </button>
            </div>
        )
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaVeiculos" id="tblListaVeiculos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloChassiVeiculos">Chassi</th>
                            <th className="tabTituloMarcaVeiculos">Marca</th>
                            <th className="tabTituloModeloVeiculos">Modelo</th>
                            <th className="tabTituloAnoVeiculos">Ano</th>
                            <th className="tabTituloCorVeiculos">Cor</th>
                            <th className="tabTituloPrecoVeiculos">Preço</th>
                            <th className="tabTituloCodLojaVeiculos">Loja</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (veiculo) =>
                                <tr key={veiculo.id}>
                                    <td>{veiculo.chassi}</td>
                                    <td>{veiculo.marca}</td>
                                    <td>{veiculo.modelo}</td>
                                    <td>{veiculo.ano}</td>
                                    <td>{veiculo.cor}</td>
                                    <td>{veiculo.preco}</td>
                                    <td>{veiculo.codLoja}</td>
                                    <td>
                                        <button onClick={() => this.carregar(veiculo)} >
                                            <MdModeEdit />
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(veiculo)} >
                                            <BsTrash />
                                        </button>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    render() {
        return (
            <Main title={title}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
