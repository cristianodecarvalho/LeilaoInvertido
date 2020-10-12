import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Main.css'
import * as ReactBootStrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../assets/leilao.svg';

import api from '../services/api'


export default function Main({ match }) {

    const [lances, setLances] = useState([]);


    //funcao chamada ao abrir essa pagina
    useEffect(() => {

        //faz chamada a API, retornando todos os lances
        async function carregarLances() {
            const response = await api.get('/lances')
            setLances(response.data)
        }
        carregarLances();
    }, [])

    //renderizar uma linha na nossa TABLE
    const renderRow = (lance, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{lance.nome ? `${lance.nome}` : 'Anônimo'}</td>
                <td>{lance.valor ? `R$ ${lance.valor}.00` : 'R$ 0.00'}</td>
            </tr>
        )
    }

    return (
        <div className="main-container">
            {/* Ao clicar na logo é redirecionado pra pagina inicial */}
            <Link to='/'>
                <img id="logo" src={logo} alt="Leilao" />
            </Link>

            <div className="row" style={{display: "flex"}}>
                {/* Criação da TABLE */}
                <ReactBootStrap.Table striped bordered hover style={{width: "60%", marginRight: "50px"}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Valor do lance(R$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lances.map(renderRow)}
                    </tbody>
                </ReactBootStrap.Table>

                {/* Criação do Card que informa o atual vencedor*/}
                <ReactBootStrap.Card style={{width: "30%", height: "150px"}}>
                    <ReactBootStrap.Card.Header style={{fontWeight: "bold"}}>Vencendo</ReactBootStrap.Card.Header>
                    <ReactBootStrap.Card.Body>
                        <ReactBootStrap.Card.Title>{lances[0]?.nome ? lances[0]?.nome : 'Anônimo'}</ReactBootStrap.Card.Title>
                        <ReactBootStrap.Card.Text>
                            {lances[0]?.valor ? `R$ ${lances[0]?.valor}.00` : 'R$ 0.00'}
                        </ReactBootStrap.Card.Text>
                    </ReactBootStrap.Card.Body>
                </ReactBootStrap.Card>
            </div>

        </div>
    )
}