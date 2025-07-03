import axios from '../lib/axios';

export const createSale = async (data) => {
    const response = await axios.post('/sale', data);
    return response.data;
};

export const getSales= async () => {
    const response = await axios.get('/sale');
    //console.log("Sales data fetched:", response.data);
    return response.data;
};

export const updateSale = async (data) => {
    const response = await axios.post('/sale', data);
    return response.data;
};

export const deleteSale = async () => {
    const response = await axios.get('/sale');
    return response.data;
};

export const getSaleById = async (id) => {
    const response = await axios.get(`/sale/${id}`);
    console.log("Sale data fetched:", response.data);
    return response.data;
}


