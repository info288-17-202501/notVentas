import axios from '../lib/axios';

export const createUser = async (data) => {
    const response = await axios.post('/register', data);
    return response.data;
};

export const getUsers = async () => {
    const response = await axios.get('/register');
    return response.data.users;
};