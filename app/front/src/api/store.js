import axios from '../lib/axios';

export const createStore = async (data) => {
    const response = await axios.post('/store', data);
    return response.data;
}

export const getStores = async (companyId) => {
    const response = await axios.get(`/store/${companyId}`);
    console.log('Response from getStores:', response.data);
    return response.data || [];
};
// export const getStores = async () => {
//     const response = await axios.get('/store');
//     return response.data || [];
// };