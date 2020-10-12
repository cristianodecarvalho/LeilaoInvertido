import React, {useState} from 'react';
import logo from '../assets/leilao.svg';
import './Login.css'
import api from '../services/api'

export default function Login({history}){

    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');

    async function handleSubmit(e){
        //evita que seja aberta uma nova aba
        e.preventDefault();       

        //verifica se os dados estão todos preenchidos
        if(nome != null && nome.trim() != '' && valor != null && valor != ''){
            //faz chamada a nossa API, criando um novo lance
            await api.post('/lances', {
                nome,
                valor
            })
            //redireciona pra nossa pagina de resultados
            history.push('/resultado');
        }
        
    }


    //permite que seja digitado apenas numeros
    function onTypeNumber(e){
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           setValor(e.target.value)
        }
     }
     

    return(
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Leilao" />
                <input 
                    placeholder= "Digite seu nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    />
                <input 
                    placeholder= "Digite seu lance"
                    value={valor}
                    onChange={onTypeNumber}
                    />
                <button type="submit">Fazer lance!</button>
            </form>
        </div>
    );
}

