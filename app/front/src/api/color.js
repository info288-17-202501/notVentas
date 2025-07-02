import axios from '../lib/axios';


export const getColors = async () => {
    const res = await axios.get('/color');
    return res.data.colors;
};