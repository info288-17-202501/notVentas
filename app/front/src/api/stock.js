import axios from '../lib/axios';

/**
 * Ajusta el stock de un producto en una tienda.
 * @param {{ store_id: number, product_id: number, color_id: number, quantity: number }} payload
 *   quantity puede ser positivo o negativo.
 */
export const updateStock = async ({ store_id, product_id, color_id, quantity }) => {
  const res = await axios.patch('/storeproducts', { store_id, product_id, color_id, quantity });
  return res.data;
};
