import React, { useState, useEffect } from 'react';
import './App.css';
import { simularEmprestimo } from './api';
import Redirecionar from './Redirecionar'; 
import Resultado from './Resultado';// Importação
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function Simulador() {
    const [tipo, setTipo] = useState('');
    const [valor, setValor] = useState('');
    const [taxaJuros, setTaxaJuros] = useState('');
    const [parcelas, setParcelas] = useState('');
    const [resultado, setResultado] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const valorFloat = parseFloat(valor.replace(',', '.'));
            const taxaFloat = parseFloat(taxaJuros.replace(',', '.'));
            const parcelasInt = parseInt(parcelas);

            if (!tipo) {
                alert('Por favor, selecione um tipo de empréstimo!');
                return;
            }

            if (isNaN(valorFloat) || isNaN(taxaFloat) || isNaN(parcelasInt)) {
                alert('Por favor, insira valores válidos!');
                return;
            }

            const payload = {
                valor: valorFloat,
                parcelas: parcelasInt,
                taxaJuros: taxaFloat,
                tipoEmprestimo: tipo,
            };

            console.log('Payload enviado:', payload);

            const resultadoAPI = await simularEmprestimo(payload);
            console.log('Resposta da API:', resultadoAPI);

            // Redireciona para a página de resultado
            setResultado(
                <Redirecionar
                    tipo={tipo}
                    valor={valorFloat}
                    taxaJuros={taxaFloat}
                    parcelas={parcelasInt}
                />
            );
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
                                type="number"
                                placeholder="0,00"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
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

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Simulador />} />
                <Route path="/resultado" element={<Resultado />} />
            </Routes>
        </Router>
    );
}

export default App;
