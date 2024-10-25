import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Resultado.css';
import { simularEmprestimo } from './api';

function Resultado() {
    const location = useLocation();
    const navigate = useNavigate();

    const [resultado, setResultado] = useState(null);
    const [loading, setLoading] = useState(true);

    const queryParams = new URLSearchParams(location.search);
    const tipo = queryParams.get('tipo');
    const valor = parseFloat(queryParams.get('valor'));
    const taxaJuros = parseFloat(queryParams.get('taxaJuros'));
    const parcelas = parseInt(queryParams.get('parcelas'));

    const buscarResultado = async () => {
        try {
            const payload = { valor, taxaJuros, parcelas, tipoEmprestimo: tipo };
            const resposta = await simularEmprestimo(payload);
            console.log('Resposta da API:', resposta);
            setResultado(resposta);
        } catch (error) {
            console.error('Erro ao buscar o resultado:', error);
            alert('Erro ao buscar a simulação. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!tipo || isNaN(valor) || isNaN(taxaJuros) || isNaN(parcelas)) {
            alert('Parâmetros inválidos. Redirecionando...');
            navigate('/');
        } else {
            buscarResultado();
        }
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!resultado) {
        return <p>Nenhum resultado disponível. Tente novamente.</p>;
    }

    const totalJuros = resultado.totalPago - valor;

    return (
        <div className="resultado-container">
            <button className="voltar-btn" onClick={() => navigate('/')}>
                ← FAZER OUTRA SIMULAÇÃO
            </button>

            <h2>Minha simulação</h2>
            <div className="simulacao-info">
                <div>
                    <span>Valor Empréstimo:</span>
                    <strong>R$ {valor.toFixed(2)}</strong>
                </div>
                <div>
                    <span>Taxa de Juros:</span>
                    <strong>{taxaJuros}% (mensal)</strong>
                </div>
                <div>
                    <span>Número de Parcelas:</span>
                    <strong>{parcelas}</strong>
                </div>
            </div>

            <h3>Resultado</h3>
            <p className="resultado-descricao">Dados da Simulação</p>
            <div className="resultado-tabela-container">
                <table className="resultado-tabela">
                    <tbody>
                        <tr>
                            <td>Valor Total (com juros)</td>
                            <td>R$ {resultado.totalPago.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Total de Juros</td>
                            <td>R$ {totalJuros.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Valor da Parcela</td>
                            <td>R$ {resultado.valorParcela.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="icones">
                <i className="fa-brands fa-whatsapp"></i>
                <i className="fa-solid fa-share-nodes"></i>
                <i className="fa-solid fa-print"></i>
                <i className="fa-solid fa-download"></i>
            </div>
        </div>
    );
}

export default Resultado;
