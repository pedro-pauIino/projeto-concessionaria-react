import React, { useEffect, useState, Component } from 'react';
import axios from 'axios';
import Main from "../template/Main";
import "./CrudConcessionaria.css";

const title = "Cadastro de Concessionaria";
const urlAPI = "http://localhost:5212/api/concessionaria";
const initialState = {
    concessionaria: { id: 0, codLoja: 0, nomeLoja: '', cep: '', endereco: '',cor:'', estado:''},   
    lista: []
}

export default class CrudConcessionaria extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
            console.log(resp.data)
        })
    }

    limpar() {
        this.setState({ concessionaria: initialState.concessionaria });
    }
    salvar() {
        const concessionaria = this.state.concessionaria;
        concessionaria.codLoja = Number(concessionaria.codLoja);
        const metodo = concessionaria.id ? 'put' : 'post';
        const url = concessionaria.id ? `${urlAPI}/${concessionaria.id}` : urlAPI;

        axios[metodo](url, concessionaria)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ concessionaria: initialState.concessionaria, lista })
            })
    }
    getListaAtualizada(concessionaria, add = true, remove = false) {
        const lista = this.state.lista.filter(a => a.id !== concessionaria.id);
        if (add) lista.unshift(concessionaria);
        if (remove) lista.splice(concessionaria);
        return lista;
    }
    atualizaCampo(event) {
        const concessionaria = { ...this.state.concessionaria };
        concessionaria[event.target.name] = event.target.value;
        this.setState({ concessionaria });
    }

    carregar(concessionaria) {
        this.setState({ concessionaria })
    }
    remover(concessionaria) {
        const url = urlAPI + "/" + concessionaria.id;
        if (window.confirm("Confirma remoção da concessionaria: " + concessionaria.nomeLoja)) {
            console.log("entrou no confirm");
            axios['delete'](url, concessionaria)
                .then(resp => {
                    const lista = this.getListaAtualizada(concessionaria, false)
                    this.setState({ concessionaria: initialState.concessionaria, lista })
                })
        }
    }

    renderForm() {
        return (
            <div className="inclui-container">
                <label> Código da Loja: </label>
                <input
                    type="number"
                    id="codLoja"
                    placeholder="Códido"
                    className="form-input"
                    name="codLoja"

                    value={this.state.concessionaria.codLoja}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Nome da Loja: </label>
                <input
                    type="text"
                    id="nomeLoja"
                    placeholder="Nome"
                    className="form-input"
                    name="nomeLoja"

                    value={this.state.concessionaria.nomeLoja}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> CEP: </label>
                <input
                    type="number"
                    id="cep"
                    placeholder="CEP"
                    className="form-input"
                    name="cep"

                    value={this.state.concessionaria.cep}
                    
                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Endereço: </label>
                <input
                    type="text"
                    id="endereco"
                    placeholder="Endereço"
                    className="form-input"
                    name="endereco"

                    value={this.state.concessionaria.endereco}
                    
                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Estado: </label>
                <input
                    type="text"
                    id="estado"
                    placeholder="Estado"
                    className="form-input"
                    name="estado"

                    value={this.state.concessionaria.estado}
                    
                    onChange={e => this.atualizaCampo(e)}
                />
                
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
                <table className="listaConcessionarias" id="tblListaConcessionarias">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloCodConcessionaria">Código</th>
                            <th className="tabTituloNomeConcessionaria">Nome</th>
                            <th className="tabTituloCepConcessionaria">CEP</th>
                            <th className="tabTituloEnderecoConcessionaria">Endereço</th>
                            <th className="tabTituloEstadoConcessionaria">Estado</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map(
                            (concessionaria) =>
                                <tr key={concessionaria.id}>
                                    <td>{concessionaria.codLoja}</td>
                                    <td>{concessionaria.nomeLoja}</td>
                                    <td>{concessionaria.cep}</td>
                                    <td>{concessionaria.endereco}</td>
                                    <td>{concessionaria.estado}</td>
                                    <td>
                                        <button onClick={() => this.carregar(concessionaria)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(concessionaria)} >
                                            Remove
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
