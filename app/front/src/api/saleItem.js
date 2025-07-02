import axios from '../lib/axios';

export const getSaleItems = async (id) => {
    const response = await axios.get(`/saleItem/${id}`);
    return response.data.items;
}
