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


/**
 * Ajusta el stock de un producto en una tienda.
 * @param {{ store_id: number, product_id: number, color_id: number, quantity: number }} payload
 *   quantity puede ser positivo (sumar) o negativo (restar).
 */
export const updateStock = async ({ store_id, product_id, color_id, quantity }) => {
  const res = await axios.patch('/storeproducts', {
    store_id,
    product_id,
    color_id,
    quantity,
  });
  return res.data;
};



