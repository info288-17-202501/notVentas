import axios from '../lib/axios';

// Función para crear un producto
export const createProduct = async (data) => {
    const response = await axios.post('/product', data);
    return response.data;
}

// Función para obtener la lista de productos
export const getProductStore = async (storeId) => {
    const response = await axios.get(`/storeproducts/${storeId}`);
    return response.data.products || [];
}

export const getProducts = async (companyId) => {
    const response = await axios.get(`/product/${companyId}`);
    return response.data.products || [];
}