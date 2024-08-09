import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.secompufscar.com.br/api-v1',
    timeout: 1000
});

export default api;