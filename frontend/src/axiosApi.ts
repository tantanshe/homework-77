import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:8001',
});
export default axiosApi;