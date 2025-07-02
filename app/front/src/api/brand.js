import axios from '../lib/axios';

export const createBrand = async (data) => {
    const response = await axios.post('/brand', data);
    return response.data;
};

export const getBrands = async () => {
    const response = await axios.get('/brand');
    return response.data.brands;
};
