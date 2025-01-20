import api from '../app/api';
import {ToastAndroid} from 'react-native';
import useAsyncStorage from './useAsyncStorage';

function useAuth() {
  const {setItem} = useAsyncStorage();

  const login = (data: any) => {
    api
      .post('/auth/login', data)
      .then(res => {
        setItem('token', res.data.token);
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      })
      .catch(err => {
        if (err.response.data.error) {
          return ToastAndroid.show(
            err.response.data.error || 'error',
            ToastAndroid.SHORT,
          );
        }
        return ToastAndroid.show('error', ToastAndroid.SHORT);
      });
  };

  const register = async (data: any) => {
    api
      .post('/auth/register', {
        ...data,
        avatar: 'https://avatar.iran.liara.run/public/73',
      })
      .then(res => {
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
      })
      .catch(err => {
        if (err.response.data.error) {
          return ToastAndroid.show(
            err.response.data.error || 'error',
            ToastAndroid.SHORT,
          );
        }
        return ToastAndroid.show('error', ToastAndroid.SHORT);
      });
  };

  return {register, login};
}

export default useAuth;
