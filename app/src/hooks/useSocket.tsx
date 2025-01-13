import {io} from 'socket.io-client';

const useSocket = () => {
  const URL = 'http://192.168.0.133:3000';
  const stream = io(URL);
  return {
    stream,
  };
};

export default useSocket;
