import axios from 'axios'

const URL = process.env.API_URL || 'localhost:8080'
axios.defaults.baseURL = `http://${API_URL}/api/`;
axios.defaults.withCredentials = true;

export default axios;