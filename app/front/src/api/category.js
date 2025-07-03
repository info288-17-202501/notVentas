import axios from '../lib/axios';

export const createCategory = async (data) => {
    const response = await axios.post('/category', data);
    return response.data;
};

export const getCategories = async () => {
    const response = await axios.get('/category');
    return response.data.categories;
};
