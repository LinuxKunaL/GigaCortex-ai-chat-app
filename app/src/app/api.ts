import axios from 'axios';
import config from '../utils/config';

const api = axios.create({
  baseURL: `${config.API_URL}/api`,
});

// api.interceptors.request.use(e => {
//   console.log(e);
// });

export default api;
