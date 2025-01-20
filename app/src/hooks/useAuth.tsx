import api from '../app/api';
import {ToastAndroid} from 'react-native';
import useAsyncStorage from './useAsyncStorage';
import RNRestart from 'react-native-restart';
import {useDispatch} from 'react-redux';
import {setMe} from '../app/redux';

function useAuth() {
  const {setItem} = useAsyncStorage();
  const dispatch = useDispatch();

  const login = (data: any) => {
    api
      .post('/auth/login', data)
      .then(res => {
        setItem('token', res.data.token);
        RNRestart.restart();
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

  const logout = () => {
    setItem('token', '');
    RNRestart.restart();
  };

  const isAuthenticated = async (): Promise<boolean> => {
    const me = await api.post('/auth/me');
    if (me?.data?.success) {
      dispatch(setMe(me.data.user));
      return true;
    }
    return false;
  };

  return {register, login, isAuthenticated, logout};
}

export default useAuth;
