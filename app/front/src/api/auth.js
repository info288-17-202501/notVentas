import axios from '../lib/axios';

// Función para login
export const login = async (email, password) => {
  const response = await axios.post('/login', { email, password });
  return response.data;
};

// Función para register
export const register = async (name, email, password) => {
  const response = await axios.post('/register', { name, email, password });
  return response.data;
};
