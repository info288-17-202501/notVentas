import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL  || 'http://localhost:3000/api', // ajusta tu URL
  withCredentials: false, // si necesitas enviar cookies (opcional)
});

export default instance;
