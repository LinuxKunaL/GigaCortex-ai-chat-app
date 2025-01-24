import api from '../app/api';
import {ToastAndroid} from 'react-native';
import useAsyncStorage from './useAsyncStorage';
import RNRestart from 'react-native-restart';
import {useDispatch} from 'react-redux';
import {setMe} from '../app/redux';
import {AxiosError} from 'axios';

function useAuth() {
  const {setItem} = useAsyncStorage();
  const dispatch = useDispatch();

  const login = async (data: any) => {
    try {
      const result = await api.post('/auth/login', data);
      setItem('token', result.data?.token);
      ToastAndroid.show(result.data.message, ToastAndroid.SHORT);
      RNRestart.restart();
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message;
      return ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    }
  };

  const register = async (data: any) => {
    try {
      const result = await api.post('/auth/register', {
        ...data,
        avatar: 'https://avatar.iran.liara.run/public/73',
      });
      ToastAndroid.show(result.data.message, ToastAndroid.SHORT);
    } catch (err: any) {
      if (err instanceof AxiosError) {
        if (err.response?.data.error) {
          return ToastAndroid.show(
            err.response.data.error || 'error',
            ToastAndroid.SHORT,
          );
        }
        return ToastAndroid.show('error', ToastAndroid.SHORT);
      }
    }
  };

  const logout = () => {
    setItem('token', '');
    RNRestart.restart();
  };

  /**
   * isAuthenticated also set a user data in @redux
   * @returns {Promise<boolean>}
   */
  const isAuthenticated = async (): Promise<boolean> => {
    try {
      const me = await api.post('/auth/me');
      if (me?.data?.success) {
        dispatch(setMe(me.data.user));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  return {register, login, isAuthenticated, logout};
}

export default useAuth;
