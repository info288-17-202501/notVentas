import axios from '../lib/axios';

// Función para crear un producto
export const createProduct = async (data) => {
    const response = await axios.post('/product', data);
    return response.data;
}

// Función para obtener la lista de productos
export const getProducts = async () => {
    const response = await axios.get('/product');
    return response.data.products || [];
}