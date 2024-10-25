// Redirecionar.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Redirecionar({ tipo, valor, taxaJuros, parcelas }) {
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams({
            tipo,
            valor,
            taxaJuros,
            parcelas,
        }).toString();

        navigate(`/resultado?${queryParams}`, { replace: true });
    }, [navigate, tipo, valor, taxaJuros, parcelas]);

    return null;
}

export default Redirecionar;
