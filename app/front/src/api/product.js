import axios from '../lib/axios';

// Función para crear un producto
export const createProduct = async (data) => {
    const response = await axios.post('/product', data);
    return response.data;
}