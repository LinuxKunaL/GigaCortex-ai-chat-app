import {io} from 'socket.io-client';
import config from '../utils/config';

const useSocket = () => {
  const URL = config.API_URL;
  const stream = io(URL);
  return {
    stream,
  };
};

export default useSocket;
