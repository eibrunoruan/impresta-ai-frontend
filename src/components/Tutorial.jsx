import React from 'react';
import './Tutorial.css';

function Tutorial() {
    const steps = [
        {
            number: 1,
            text: "Primeiro, selecione o tipo de empréstimo: Pessoal, FGTS, Consignado;"
        },
        {
            number: 2,
            text: "Depois, insira o valor desejado na parte “Valor do empréstimo”;"
        },
        {
            number: 3,
            text: "Coloque a taxa de juros a ser cobrada;"
        },
        {
            number: 4,
            text: "Logo após, informe números de parcelas que deseja (em quantas vezes irá pagar);"
        },
        {
            number: 5,
            text: "Por fim, clique em “Calcular” e veja os resultados."
        }
    ];

    return (
        <div className="tutorial-container">
            <h2>Como usar o simulador de empréstimo da Empresta.ai</h2>
            <ul className="tutorial-list">
                {steps.map((step) => (
                    <li key={step.number} className="tutorial-item">
                        <span className="tutorial-number">{step.number}</span>
                        {step.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tutorial;
