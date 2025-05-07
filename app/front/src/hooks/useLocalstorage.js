//Crea el hook para manejar el localstorage
import { useState, useEffect } from 'react';
export function useToken() {
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setHasToken(!!token);
    }, []);

    return hasToken;
}