import axios from '../lib/axios';

export const createUser = async (data) => {
    const response = await axios.post('/register', data);
    return response.data;
};

export const getUsers = async (companyId) => {
    const response = await axios.get(`/user/${companyId}`);
    return response.data.users;
};

export const editUser = async (data) => {
    const response = await axios.put('/edit-user', data);
    return response.data;
}