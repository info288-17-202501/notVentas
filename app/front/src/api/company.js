import axios from '../lib/axios';

// Función para obtener la lista de empresas
export const getCompanies = async () => {
  try {
    const response = await axios.get('/company');
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de empresas:', error);
    throw error;
  }
};