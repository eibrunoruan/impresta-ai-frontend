// api.js
export const simularEmprestimo = async (payload) => {
    const response = await fetch(
        'https://imprestaai-api.up.railway.app/api/emprestimos/simular',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro da API:', errorText);
        throw new Error(`Erro na simulação: ${errorText}`);
    }

    return response.json(); 
};

export const obterTaxaSelic = async () => {
    const response = await fetch(
        'https://imprestaai-api.up.railway.app/api/emprestimos/taxa-selic'
    );

    if (!response.ok) {
        throw new Error('Erro ao obter taxa Selic.');
    }

    return response.json();
};
