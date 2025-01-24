import axios from 'axios';
import config from '../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: `${config.API_URL}/api`,
});

api.interceptors.request.use(async conf => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    conf.headers.Authorization = `Bearer ${token}`;
  }
  return conf;
});

api.interceptors.response.use(response => response);

export default api;
