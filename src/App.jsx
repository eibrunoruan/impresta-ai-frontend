import React, { useState } from 'react';
import './App.css';
import { simularEmprestimo } from './api';
import Redirecionar from './Redirecionar';
import Resultado from './Resultado';
import Tutorial from './components/Tutorial';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const formatarMoedaBRL = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(valor);
};

function Simulador() {
    const navigate = useNavigate();
    const [tipo, setTipo] = useState('');
    const [valor, setValor] = useState('');
    const [taxaJuros, setTaxaJuros] = useState('');
    const [parcelas, setParcelas] = useState('');
    const [resultado, setResultado] = useState(null);

    const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        // Remover símbolos de moeda e converter o valor para int
        const valorInt = parseInt(valor.replace(/[R$.\s]/g, '').replace(',', '.'));
        const taxaFloat = parseFloat(taxaJuros.replace(',', '.'));
        const parcelasInt = parseInt(parcelas);

        if (!tipo) {
            alert('Por favor, selecione um tipo de empréstimo!');
            return;
        }

        if (isNaN(valorInt) || isNaN(taxaFloat) || isNaN(parcelasInt)) {
            alert('Por favor, insira valores válidos!');
            return;
        }

        const payload = {
            valor: valorInt,        // Garantindo que valor seja um inteiro
            parcelas: parcelasInt,  // Garantindo que parcelas seja um inteiro
            taxaJuros: taxaFloat,   // Garantindo que taxa seja float
            tipoEmprestimo: tipo,
        };

        console.log('Payload enviado:', payload);

        const resultadoAPI = await simularEmprestimo(payload);
        console.log('Resposta da API:', resultadoAPI);

        setResultado(
            <Redirecionar
                tipo={tipo}
                valor={formatarMoedaBRL(valorInt)}
                taxaJuros={taxaFloat}
                parcelas={parcelasInt}
            />
        );

        // Redirecionar para a página de resultado
        navigate('/resultado');

    } catch (error) {
        console.error('Erro na simulação:', error);
        alert('Ocorreu um erro na simulação. Verifique o console para mais detalhes.');
    }
};


    const handleLimpar = () => {
        setTipo('');
        setValor('');
        setTaxaJuros('');
        setParcelas('');
        setResultado(null);
    };

    return (
        <div className="simulador-container">
            <h1 className="titulo">Simulador de Empréstimo</h1>
            <p className="descricao">Qual o tipo de empréstimo desejado?</p>
            <form onSubmit={handleSubmit}>
                <div className="tipo-emprestimo">
                    <label>
                        <input
                            type="radio"
                            value="PESSOAL"
                            checked={tipo === 'PESSOAL'}
                            onChange={(e) => setTipo(e.target.value)}
                        />
                        Pessoal
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="FGTS"
                            checked={tipo === 'FGTS'}
                            onChange={(e) => setTipo(e.target.value)}
                        />
                        FGTS
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="CONSIGNADO"
                            checked={tipo === 'CONSIGNADO'}
                            onChange={(e) => setTipo(e.target.value)}
                        />
                        Consignado
                    </label>
                </div>

                <div className="inputs-container">
                    <div className="input-group">
                        <label htmlFor="valor">Valor do Empréstimo</label>
                        <div className="input-wrapper">
                            <span>R$</span>
                            <input
                                id="valor"
                                type="text"
                                placeholder="0,00"
                                value={valor}
                                onChange={(e) => {
                                    const valorDigitado = e.target.value.replace(/[^\d,]/g, '');
                                    setValor(valorDigitado);
                                }}
                                onBlur={() => {
                                    const valorNumerico = parseFloat(valor.replace(',', '.'));
                                    if (!isNaN(valorNumerico)) {
                                        setValor(formatarMoedaBRL(valorNumerico));
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="juros">Taxa de Juros (%)</label>
                        <div className="input-wrapper">
                            <span>%</span>
                            <input
                                id="juros"
                                type="number"
                                placeholder="0,00"
                                value={taxaJuros}
                                onChange={(e) => setTaxaJuros(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="parcelas">Número de Parcelas</label>
                        <div className="input-wrapper">
                            <input
                                id="parcelas"
                                type="number"
                                placeholder="0"
                                value={parcelas}
                                onChange={(e) => setParcelas(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="buttons-container">
                    <button type="submit">CALCULAR</button>
                    <span className="limpar" onClick={handleLimpar}>
                        LIMPAR
                    </span>
                </div>
            </form>

            {resultado}
        </div>
    );
}

function Home() {
    return (
        <div>
            <Simulador /> 
            <Tutorial />  
        </div>
    );
}

function App() {
    return (
        <Router>
            <Navbar /> 
            <div className="page-content"> 
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/resultado" element={<Resultado />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
