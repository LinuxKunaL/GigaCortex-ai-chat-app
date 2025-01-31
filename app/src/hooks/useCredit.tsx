import {useCallback} from 'react';
import api from '../app/api';

const useCredit = () => {
  const getCreditPricing = useCallback(async () => {
    try {
      const result = await api.get('/credit/pricing');
      if (result.data.success) {
        return result.data.data;
      }
    } catch (error) {
      return error;
    }
  }, []);
  const getOrder = useCallback(async (id: number) => {
    try {
      const result = await api.post('/credit/order', {id});
      if (result.data.success) {
        return result.data.data;
      }
    } catch (error) {
      return error;
    }
  }, []);
  const paymentCredit = useCallback(async (data: any) => {
    try {
      const result = await api.post('/credit/payment', {data});
      if (result.data.success) {
        return result.data;
      }
    } catch (error) {
      return error;
    }
  }, []);
  return {getCreditPricing, getOrder, paymentCredit};
};

export default useCredit;
