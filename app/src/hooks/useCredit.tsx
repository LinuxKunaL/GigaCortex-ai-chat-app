import {useCallback} from 'react';
import api from '../app/api';

const useCredit = () => {
  const getCreditPricing = useCallback(async () => {
    try {
      const result = await api.get('/credit/pricing');
      return result.data;
    } catch (error) {
      return error;
    }
  }, []);
  return {getCreditPricing};
};

export default useCredit;
