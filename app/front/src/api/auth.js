import axios from '../lib/axios';

// Función para login
export const login = async (email, password) => {
  const response = await axios.post('/auth/login', { email, password });
  return response.data;
};

// Función para register
export const register = async (name, email, password) => {
  const response = await axios.post('/auth/register', { name, email, password });
  return response.data;
};
